---
title: Hiểu sâu về Q-Learning (Phần 2 - Monte Carlo)
date: '2023-11-18'
tags: ['Reinforcement Learning', 'Machine Learning', 'Optimization', 'Probability', 'Mathematics']
draft: false
summary: Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Q-Learning cùng với cách xây dựng và triển khai hai thuật toán quan trọng là Adaptive Dynamic Programming và Monte Carlo.
layout: PostView
thumbnail: '/static/images/thumbnails/hieu-sau-ve-q-learning.png'
---

_Q-Learning là một thuật toán Reinforcement Learning (Học Tăng cường). Tuy không dùng đến Neural Network (Mạng Nơ-ron) nhưng thuật toán này vẫn có thể giải quyết được rất nhiều bài toán trong thực tế._

_Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Q-Learning cùng với cách xây dựng và triển khai hai thuật toán quan trọng là **Adaptive Dynamic Programming** (Quy hoạch Động Thích ứng) và **Monte Carlo** (Mô phỏng Monte Carlo)._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/hieu-sau-ve-q-learning.png" alt="Hiểu sâu về Q-Learning" />

Khuyến nghị đọc trước [Phần 1](https://snowyfield.me/posts/hieu-sau-ve-q-learning-phan-1/) để sẵn sàng trước khi đi vào bài viết này.

## Nhắc lại

Chúng ta đã biết cách hoạt động và các khái niệm quan trọng của Markov Decision Process trong series trước. Tuy nhiên đây chỉ là một công cụ dùng để khái quát hoá bài toán Reinforcement Learning (Học Tăng cường). Thực tế, Agent thường không có khả năng biết được các thông tin quan trọng như Reward hay Transition Model.

Để hiểu đơn giản, MDP là một bài toán giúp Agent lập kế hoạch, vì lúc này Agent đã biết được các thông tin quan trọng. Trong khi đó Q-Learning bao gồm cả quá trình học để có được các thông tin này.

**Q-Learning** (Học Q) là một thuật toán giúp Agent có thể học được các thông tin này thông qua việc thử nhiều lần và rút ra kinh nghiệm. Để có thể triển khai được thuật toán này, chúng ta sẽ cần tìm hiểu qua hai thuật toán quan trọng là **Adaptive Dynamic Programming** (Quy hoạch Động Thích ứng) và **Monte Carlo** (Mô phỏng Monte Carlo).

## Khái niệm

Giống với ADP, Monte Carlo cũng là một thuật toán giúp Agent có thể học được các thông tin quan trọng thông qua việc thử nhiều lần và rút ra kinh nghiệm. Tuy nhiên thuật toán này sẽ không cần dùng đến Reward và Transition Model như ADP.

Do đó, ta gọi Monte Carlo là một thuật toán Model-free (Không dựa trên Model), trong khi ADP là thuật toán Model-based (Dựa trên Model).

### Nguồn gốc cái tên Monte Carlo

Monte Carlo thực chất là một phương pháp được sử dụng rất nhiều trong thống kê để ước tính giá trị của một hàm số thông qua việc lấy các sample (mẫu) ngẫu nhiên lặp đi lặp lại nhiều lần.

Một ví dụ điển hình để hình dung về thuật toán Monte Carlo là việc ước tính giá trị $\pi$ (pi) thông qua việc tạo ra các điểm ngẫu nhiên trong một hình vuông và đếm số điểm nằm trong một hình tròn nằm trong hình vuông đó:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/monte-carlo-pi.gif"
    alt="Ví dụ về Monte Carlo"
/>
<figcaption>Source: medium.com by ln8378</figcaption>
</figure>

Cho đường tròn $x^2 + y^2 = 1$ nội tiếp hình vuông $x \in [-1, 1], y \in [-1, 1]$. Giả sử chúng ta tạo ra $N$ điểm $(x_i, y_i)$ ngẫu nhiên trong hình vuông này. Khi đó, ta sẽ theo dõi số điểm nằm trong hình tròn $N_{circle}$ theo thuật toán sau:

$$
\begin{align}
N &= N + 1 \notag \\
N_{circle} &= N_{circle} + 1 \quad \text{if} \quad x_i^2 + y_i^2 \leq 1 \notag \\
\end{align}
$$

Ta có:

$$
\begin{align}
\frac{S_{circle}}{S_{square}} &= \frac{\pi r^2}{(2r)^2} = \frac{\pi}{4} \notag \\
\implies \pi &= \frac{4 S_{circle}}{S_{square}} \approx \frac{4 N_{circle}}{N} \notag \\
\end{align}
$$

Khi đó ta có thể xấp xỉ giá trị $\pi$ thông qua việc đếm số điểm nằm trong hình tròn và hình vuông.

## Xây dựng Monte Carlo

Như ta đã biết, MDP và ADP là các thuật toán xác định Policy bằng cách ước tính Value của mỗi State. Để làm được điều này, chúng ta sẽ cần tới Reward và Transition Model. Vì vậy để bỏ đi hai yếu tố này, chúng ta sẽ cần phải thiết lập một thành phần mới với mục đích tương tự. Và thành phần (rất) quan trọng này chính là **Q-Value** (Giá trị Q), thứ sẽ ảnh hưởng đến các bài toán **Reinforcement Learning** (Học Tăng cường) sau này.

> Phần này giả sử người đọc đã nắm được các kí hiệu và ví dụ ở series [Hiểu sâu về Markov Decision Process](https://snowyfield.me/posts/hieu-sau-ve-markov-decision-process/).

### Xây dựng Q-Value

Hãy để ý rằng, Reward $\mathcal{R}$ nhận State $s$ làm đầu vào và Transition Model $\mathcal{T}$ nhận cặp State-Action $(s, a)$ làm đầu vào. Và cuối cùng sử dụng chúng để xác định $\mathcal{V}(s)$.

Tuy nhiên chúng ta có thể gộp cả 2 thành phần này lại với nhau thành một thành phần gọi là $\mathcal{Q}(s, a)$. Thành phần này sẽ nhận cặp State-Action $(s, a)$ làm đầu vào và trả về một giá trị thể hiện mức độ "tốt" của cặp này hệt như chức năng của Value nhưng đơn giản hơn.

Hãy sử dụng lại công thức tính Value (theo Value Iteration):

$$
\begin{align}
\mathcal{V}(s) &= \mathcal{R}(s) + \gamma \max_{a \in A}\left[\sum \mathcal{T}(s' | s, a) \mathcal{V}(s')\right] \\
\end{align}
$$

Vì $\mathcal{V}(s)$ và $\mathcal{Q}(s, a)$ có tính chất như nhau nên:

$$
\begin{align}
\mathcal{V}(s) &= \max_a \left[ \mathcal{R}(s) + \gamma \sum \mathcal{T}(s' | s, a) \mathcal{V}(s') \right] \notag \\
&= \max_a \left[ \mathcal{Q} (s, a) \right] \\
\end{align}
$$

Giờ đây, chỉ cần ước tính được $\mathcal{Q}(s, a)$ thì chúng ta có thể chọn ra được Action tốt nhất cho State $s$ mà không cần phải xử lí qua Reward và Transition Model.

Tương tự như trên, với công thức tính Policy (theo Policy Iteration):

$$
\begin{align}
\mathcal{\pi}(s) &= \arg \max_a \left[\sum \mathcal{T}(s' \mid s, a) \mathcal{V}(s')\right] \\
\end{align}
$$

Ta có thể cung cấp thêm Reward và Discount Factor vào công thức trên:

$$
\begin{align}
\mathcal{\pi}(s) &= \arg \max_a \left[\mathcal{R}(s) + \gamma \sum \mathcal{T}(s' \mid s, a) \mathcal{V}(s')\right] \notag \\
&= \arg \max_a \left[ \mathcal{Q}(s, a) \right] \\
\end{align}
$$

Một lần nữa, Policy có thể được xác định dựa trên $\mathcal{Q}(s, a)$ duy nhất mà không cần phải xử lí qua Reward và Transition Model.

Tuy nhiên Q-Value không được tính bằng công thức đó mà sẽ dùng phương pháp Monte Carlo để ước tính.

### Monte Carlo

Cho một Episode $e$ bắt đầu từ State $s_0$ và kết thúc tại State $s_p$ với một chuỗi các Action $a_0, a_1, \dots, a_{p-1}$ và Reward $r_0, r_1, \dots, r_{p-1}$ như sau:

$$
\begin{align}
\text{Episode } e &= [s_0, a_0, r_0, s_1, a_1, r_1, \dots, s_{p-1}, a_{p-1}, r_{p-1}, s_p] \\
\end{align}
$$

Tại State $s_0$, ta thực hiện Action $a_0$ và nhận được Reward $r_0$ và State $s_1$. Tiếp tục thực hiện Action $a_1$, ta sẽ nhận được Reward $r_1$ và State $s_2$. Và cứ tiếp tục như vậy cho đến khi đạt đến State $s_p$.

Ta sẽ định nghĩa lại $\mathcal{C}(s, a)$ là Cucumlative Reward của một Episode $e$ bắt đầu từ State $s$ và Action $a$ (bỏ qua Random Rate):

$$
\begin{align}
\mathcal{C}(s, a) &= \sum_{i=0}^{p-1} r_i \\
\end{align}
$$

Ví dụ, ta có một Episode $e_0$ như sau:

$$
[\dots, s_3, a_1, r_0, s_4, a_2, r_1, s_5, a_0, r_3, \dots, s_3, a_1, r_2, s_5, a_2,r_2, s_6, a_0, r_0 \dots]
$$

#### First-visit

Chúng ta không cần quan tâm Episode này bắt đầu từ State nào, miễn là trong đó có cặp State-Action cần tính (ví dụ $s_3, a_1$). Ta sẽ ngầm giả sử Episode bắt đầu tại đây và tính Cucumlative Reward bắt đầu từ cặp State-Action này trở đi.

$$
\mathcal{C}(s_3, a_1) = r_0 + r_1 + r_3 + \dots + r_2 + r_2 + r_0 + \dots
$$

Vì là **First-visit** nên trong một Episode, Cucumlative Reward chỉ được tính một lần duy nhất cho mỗi cặp State-Action.

#### Every-visit

Tuy nhiên Every-visit không giống vậy, ta sẽ tính Cucumlative Reward cho mỗi lần xuất hiện của cặp State-Action trong một Episode. Với ví dụ trên, ta sẽ có:

$$
\begin{aligned}
\mathcal{C}(s_3, a_1) &= r_0 + r_1 + r_3 + \dots + r_2 + r_2 + r_0 + \dots \\
\mathcal{C}(s_3, a_1) &= r_2 + r_2 + r_0 + \dots
\end{aligned}
$$

Tuy nhiên, bài viết này sẽ chỉ tập trung vào First-visit.

#### C-Table và Q-Table

Ta sẽ thực hiện việc tính Cuclumative Reward cho mọi cặp State-Action xuất hiện trong một Episode và lưu lại vào một bảng gọi là **C-Table** (Bảng C).

$$
\begin{align}
c_{s, a} &= \mathcal{C}(s, a) \quad \forall s \in S, a \in A \notag \\
\mathbf{C} &= \begin{bmatrix}
\mathcal{C}(s_0, a_0) & \mathcal{C}(s_0, a_1) & \dots & \mathcal{C}(s_0, a_{p-1}) \\
\mathcal{C}(s_1, a_0) & \mathcal{C}(s_1, a_1) & \dots & \mathcal{C}(s_1, a_{p-1}) \\
\vdots & \vdots & \ddots & \vdots \\
\mathcal{C}(s_{p-1}, a_0) & \mathcal{C}(s_{p-1}, a_1) & \dots & \mathcal{C}(s_{p-1}, a_{p-1}) \\
\end{bmatrix} \\
\end{align}
$$

Ví dụ với Episode $e_0$ như trên, ta sẽ có:

$$
\begin{aligned}
\mathcal{C}(s_3, a_1) &= r_0 + r_1 + r_3 + \dots + r_2 + r_2 + r_0 + \dots \\
\mathcal{C}(s_4, a_2) &= r_1 + r_3 + \dots + r_2 + r_2 + r_0 + \dots \\
\mathcal{C}(s_5, a_0) &= r_3 + \dots + r_2 + r_2 + r_0 + \dots \\
\mathcal{C}(s_5, a_2) &= r_2 + r_0 + \dots \\
\mathcal{C}(s_6, a_0) &= r_0 + \dots \\
\dots \\
\end{aligned}
$$

Khi đó, cho một C-Table sẽ có dạng như sau:

$$
\begin{aligned}
\mathbf{C} &= \begin{bmatrix}
\ldots & \ldots & \ldots & \ldots & \ldots \\
\ldots & \mathcal{C}(s_3, a_1) & \ldots & \ldots & \ldots \\
\ldots & \ldots & \mathcal{C}(s_4, a_2) & \ldots & \ldots \\
\mathcal{C}(s_5, a_0) & \ldots & \ldots & \mathcal{C}(s_5, a_2) & \ldots \\
\mathcal{C}(s_6, a_0) & \ldots & \ldots & \ldots & \ldots \\
\ldots & \ldots & \ldots & \ldots & \ldots \\
\end{bmatrix} \\
\end{aligned}
$$

Tuy nhiên đây chỉ là Episode $e_0$, chúng ta cần nhiều hơn thế nữa để lấp đầy tất cả cặp State-Action. Vì vậy, chúng ta sẽ thực hiện việc này $N$ Episode và sau đó lấy trung bình của các C-Table này. Đây chính là **Q-Table** (Bảng Q).

$$
\begin{align}
\mathbf{Q} &= \frac{1}{N} \sum_{i=1}^N \mathbf{C}_i \\
\end{align}
$$

Công thức trên khá khó để có thể cập nhật lại Q-Table sau mỗi Episode vì chúng ta phải tính tổng toàn bộ C-Table từ đầu, hơn nữa, chúng ta sẽ không lưu lại các C-Table trước đó.

Vì vậy, chúng ta sẽ biến đổi một chút để có thể cập nhật Q-Table bằng Q-Table hiện tại và C-Table tính được:

$$
\begin{align}
\mathbf{Q}_n &= \frac{ \sum_{i=1}^n \mathbf{C}_i }{n}\notag \\
&= \frac{\mathbf{C}_n + \sum_{i=1}^{n-1} \mathbf{C}_i}{n} \notag \\
&= \frac{\mathbf{C}_n + (n-1) \frac{\sum_{i=1}^{n-1} \mathbf{C}_i}{n-1}}{n} \notag \\
&= \frac{\mathbf{C}_n + (n-1) \mathbf{Q}_{i-1}}{n} \notag \\
&= \frac{n \mathbf{Q}_{n-1} + \mathbf{C}_n - \mathbf{Q}_{n-1}}{n} \notag \\
&= \mathbf{Q}_{n-1} + \frac{\mathbf{C}_n - \mathbf{Q}_{n-1}}{n} \\
\end{align}
$$

### Thuật toán

Chúng ta đã qua hết những thứ cần thiết để xây dựng thuật toán. Các bước thực hiện của thuật toán Monte Carlo giống với ADP, đều gồm 3 bước dưới đây:

#### Actute

Đây là bước Agent lựa chọn Action $a$ để thực hiện dựa trên State hiện tại $s$ và Policy $\pi$.

Bước này không có thay đổi gì với ADP. Cũng dựa vào một hệ số phân rã $\epsilon$ để quyết định xem Agent sẽ thực hiện Exploration hay Exploitation. Nếu là Exploration thì Agent sẽ lựa chọn Action $a$ ngẫu nhiên, ngược lại sẽ lựa chọn Action $a$ tốt nhất, chính là từ Policy $\pi$.

$$
\begin{align}
&\alpha \leftarrow \mathcal{U}(0, 1) \notag \\
&\begin{cases}
a \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}{A} &\text{if } \alpha < \epsilon \\
a = \pi(s) &\text{otherwise}
\end{cases}
\end{align}
$$

#### Percept

Đây là bước cung cấp cho Agent những thông tin cần thiết. Bao gồm State hiện tại $s$, Action $a$ đã chọn ở bước Actuate, State mới $s'$ và Reward $r$ đã nhận được.

Q-Table sẽ được cập nhật dựa trên thông tin này bằng những công thức đã xây dựng ở trên.

$$
\begin{align}
(s', r) &= \mathcal{B}(s, a) \notag \\
\text{visited} &\cup \{(s, a)\} \notag \\
\mathbf{C}[s, a] &= \mathbf{C}[s, a] + r \quad \forall (s, a) \in \text{visited} \\
\end{align}
$$

Thuật toán này có nghĩa là một khi cặp State-Action $(s, a)$ đã xuất hiện trong Episode hiện tại, Cumulative Reward của nó sẽ phải được cập nhật với mỗi Reward $r$ mới được thêm vào.

#### Policy Improvement

Với ADP, chúng ta có Reward và Transition Model nên có thể dùng một trong các thuật toán MDP để thực hiện Policy Improvement. Tuy nhiên với Monte Carlo, chúng ta sẽ phải xây dựng một thuật toán mới để thực hiện việc này.

$$
\begin{align}
\forall (s, a) &\in \text{visited}: \begin{cases}
\mathbf{N}[s, a] &= \mathbf{N}[s, a] + 1 \\
\mathbf{Q}[s, a] &= \mathbf{Q}[s, a] + \frac{\mathbf{C}[s, a] - \mathbf{Q}[s, a]}{\mathbf{N}[s, a]} \\
\end{cases} \notag \\
\pi(s) &= \arg \max_a \mathbf{Q}[s, a] \notag \\
\epsilon &= \epsilon \times \xi \\
\end{align}
$$

Sau mỗi Episode, chúng ta sẽ khởi tạo lại $\mathbf{C}[s, a]$ và $\text{visited}$, chỉ giữ lại $\mathbf{Q}[s, a]$ và $\mathbf{N}[s, a]$ để phục vụ Monte Carlo.

### Kết luận

Lấy ví dụ từ series trước, sau khi chạy thuật toán với 100 Episode, chúng ta có tổng Reward nhận được như sau:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mc-rewards.png"
    alt="Reward nhận được sau 1000 Episode"
/>
</figure>

Còn đây là tỉ lệ thắng qua mỗi Episode:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mc-winning-rate.png"
    alt="Tỉ lệ thắng nhận được sau 1000 Episode"
/>
</figure>

Cuối cùng là Policy tính được:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mc-policy.png"
    alt="Policy sau 1000 Episode"
/>
</figure>

Đây là input từ ADP và MDP, có thể thấy nó không hiệu quả lắm và Policy cũng không hợp lí. Bởi vì không như ADP hay MDP, Monte Carlo rất phụ thuộc vào Reward và nó ảnh hưởng trực tiếp đến Policy. Do đó, chúng ta hãy thử với bộ Reward mới:

$$
\begin{align}
\mathcal{R}(s) &= \begin{cases}
+10 & \text{if} \enspace \mathbf{E}[\mathcal{S}^{-1}(s)] = \text{goal} \\
-10 & \text{if} \enspace \mathbf{E}[\mathcal{S}^{-1}(s)] = \text{pit} \\
-0.4 & \text{if} \enspace \mathbf{E}[\mathcal{S}^{-1}(s)] = \text{empty} \\
\text{NaN} & \text{otherwise} \\
\end{cases} \\
\end{align}
$$

Policy thu được đã khả quan hơn rất nhiều:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mc-policy-2.png"
    alt="Policy sau 1000 Episode"
/>
</figure>

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/reinforcement_learning](https://github.com/SnowyField1906/ai-general-research/reinforcement_learning).

### Thuật toán chính

Xem tại [MCLearning.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/MCLearning.py).

#### Khởi tạo

```python
def __init__(self, n_states, blackbox_move):
    self.n_states = n_states
    self.transition_threshold = T.TRANSITION_THRESHOLD

    self.policy = np.random.randint(A.LEN, size=n_states)
    self.q_table = np.ones((n_states, A.LEN))
    self.c_table = np.zeros((n_states, A.LEN))

    self.visited = np.zeros((n_states, A.LEN))
    self.count_table = np.zeros((n_states, A.LEN))

    self.blackbox_move = blackbox_move
```

#### Percept và Actuate

- Percept:

```python
def percept(self, state, action, reward):
    if self.visited[state, action] == 0:
        self.visited[state, action] = 1

    visited = self.visited == 1
    self.c_table[visited] += reward
```

- Actuate:

```python
def actuate(self, next_state):
    if np.random.uniform() <= self.transition_threshold:
        return np.random.randint(A.LEN)
    else:
        return self.policy[next_state]
```

#### Evaluation và Improvement

- Evaluation:

```python
def one_evaluation(self, state):
    while True:
        action = self.actuate(state)
        next_state, reward = self.blackbox_move(state, action)
        self.percept(state, action, reward)
        reward_game += reward

        if reward in T.TERMINAL:
            break
        else:
            state = next_state
```

- Improvement:

```python
def policy_improvement(self):
    visited = self.visited == 1
    self.count_table[visited] += 1

    self.q_table[visited] += (self.c_table[visited] - self.q_table[visited]) / self.count_table[visited]

    for state in range(self.n_states):
        self.policy[state] = np.argmax(self.q_table[state])

    self.c_table = np.zeros((self.n_states, A.LEN))
    self.visited = np.zeros((self.n_states, A.LEN))
    self.transition_threshold *= T.DECAY_FACTOR
```

#### Thuật toán Monte Carlo

```python
def train(self, start_state):
    for i in range(T.EVALUATION_LIMIT):
        self.one_evaluation(start_state)
        self.policy_improvement()
```

### Các hàm phụ trợ

Xem tại [Visualizer.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/Visualizer.py).

### Kiểm thử

Xem tại [test-MCLearning.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/test-MCLearning.py).
