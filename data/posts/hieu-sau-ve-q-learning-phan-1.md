---
title: Hiểu sâu về Q-Learning (Phần 1 - Adaptive Dynamic Programming)
date: '2023-11-17'
tags: ['Reinforcement Learning', 'Machine Learning', 'Optimization', 'Probability', 'Mathematics']
draft: false
summary: Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Q-Learning cùng với cách xây dựng và triển khai hai thuật toán quan trọng là Adaptive Dynamic Programming và Monte Carlo.
layout: PostView
thumbnail: '/static/images/thumbnails/hieu-sau-ve-q-learning.png'
---

_Q-Learning là một thuật toán Reinforcement Learning (Học Tăng cường). Tuy không dùng đến Neural Network (Mạng Nơ-ron) nhưng thuật toán này vẫn có thể giải quyết được rất nhiều bài toán trong thực tế._

_Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Q-Learning cùng với cách xây dựng và triển khai hai thuật toán quan trọng là **Adaptive Dynamic Programming** (Quy hoạch Động Thích ứng) và **Monte Carlo** (Mô phỏng Monte Carlo)._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/hieu-sau-ve-q-learning.png" alt="Hiểu sâu về Q-Learning" />

Khuyến nghị đọc trước series [Hiểu sâu về Markov Decision Process](https://snowyfield.me/posts/hieu-sau-ve-markov-decision-process-phan-1/) để sẵn sàng trước khi đi vào bài viết này.

## Nhắc lại

Chúng ta đã biết cách hoạt động và các khái niệm quan trọng của Markov Decision Process trong bài viết trước. Tuy nhiên đây chỉ là một công cụ dùng để khái quát hoá bài toán Reinforcement Learning (Học Tăng cường). Thực tế, Agent thường không có khả năng biết được các thông tin quan trọng như Reward hay Transition Model.

Để hiểu đơn giản, MDP là một bài toán giúp Agent lập kế hoạch, vì lúc này Agent đã biết được các thông tin quan trọng. Trong khi đó Q-Learning bao gồm cả quá trình học để có được các thông tin này.

**Q-Learning** (Học Q) là một thuật toán giúp Agent có thể học được các thông tin này thông qua việc thử nhiều lần và rút ra kinh nghiệm. Để có thể triển khai được thuật toán này, chúng ta sẽ cần tìm hiểu qua hai thuật toán quan trọng là **Adaptive Dynamic Programming** (Quy hoạch Động Thích ứng) và **Monte Carlo** (Mô phỏng Monte Carlo).

## Khái niệm

**Adaptive Dynamic Programming** (Quy hoạch Động Thích ứng) hay ADP là một thuật toán giúp Agent có thể học được các thông tin quan trọng như Reward hay Transition Model thông qua việc thử nhiều lần và rút ra kinh nghiệm. Khác với **Monte Carlo** (Mô phỏng Monte Carlo), ADP vẫn cần phải dựa vào Transition Model để có thể học được.

Do đó, ta gọi ADP là một thuật toán **Model-based** (Dựa trên Model) trong khi Monte Carlo là thuật toán **Model-free** (Không dựa trên Model).

## Xây dựng Adaptive Dynamic Programming

Như đã nói ở trên, Q-Learning là một bài toán MDP nhưng bị khuyết đi 2 thông tin quan trọng là Reward và Transition Model. Vì vậy, chúng ta sẽ cần phải xây dựng lại 2 thông tin này thông qua việc thử nghiệm nhiều lần.

> Phần này giả sử người đọc đã nắm được các kí hiệu và ví dụ ở series [Hiểu sâu về Markov Decision Process](https://snowyfield.me/posts/hieu-sau-ve-markov-decision-process/).

### Xây dựng Reward

Ta đặt một mapping function $\mathcal{B}$ mô tả một bước đi của Agent. Bước đi này yêu cầu thông tin về State hiện tại $s$ và Action $a$ được thực hiện và cho biết State mới $s'$ và Reward $r$ cho State cũ.

$$
\begin{align}
\mathcal{B}: S \times A \rightarrow S \times R \notag \\
\mathcal{B}(s, a) = (s', r)
\end{align}
$$

Khi đó, chúng ta có thể ước tính được Reward của một State mới (chưa từng đến) bằng cách sử dụng lại Reward của State cũ. Nói cách khác, $\mathcal{R}(s') = r$.

### Xây dựng Transition Model

Transition Model sẽ phức tạp hơn, ở bài toán MDP, Transition Model được xác định dựa trên Random Rate. Tuy nhiên, ở đây chúng ta sẽ xây dựng lại Transition Model dựa trên kinh nghiệm của Agent. Có nghĩa là Agent sẽ ưu tiên các State đã từng đạt nhiều lần trước đó thay vì mạo hiểm với các State mới. Do đó, công thức của Transition Model sẽ được xây dựng như sau:

$$
\begin{align}
\mathcal{T}: S \times A \times S \rightarrow [0, 1] \notag \\
\mathcal{T}(s' \mid a, s) = \frac{n(s' \mid a, s')}{n(s, a)}
\end{align}
$$

Công thức trên có thể được hiểu là, tại State $s$ và chuẩn bị thực hiện Action $a$, tỉ lệ Agent đạt được State $s'$ sẽ là tỉ lệ mà Agent đã đạt được State đó so với các State khác khi thực hiện Action $a$ tại State $s$ trong quá khứ.

Ví dụ, với cặp State-Action $(s, a) = (1, 1)$:

$$
\begin{align}
&n(1 \mid 1, 1) = 3 \notag \\
&n(2 \mid 1, 1) = 1 \notag \\
&n(3 \mid 1, 1) = 2 \notag \\
&n(4 \mid 1, 1) = 6 \notag \\
\implies &n(1, 1) = \sum_{s' \in S} n(s' | 1, 1) = 12 \notag \\
\implies &\begin{cases}
\mathcal{T}(1 \mid 1, 1) = \frac{3}{12} = 0.25 \notag \\
\mathcal{T}(2 \mid 1, 1) = \frac{1}{12} = 0.083 \\
\mathcal{T}(3 \mid 1, 1) = \frac{2}{12} = 0.167 \\
\mathcal{T}(4 \mid 1, 1) = \frac{6}{12} = 0.5 \\
\end{cases}
\end{align}
$$

Bằng cách lặp lại quá trình trên với tất cả các cặp State-Action, chúng ta sẽ có được một Transition Model hoàn chỉnh để phục vụ cho bước Policy Improvement.

### Exploration và Exploitation

Tuy nhiên việc lặp qua toàn bộ các cặp State-Action ở bước xây dựng Transition Model như vậy sẽ rất tốn kém. Hơn nữa, bài toán này không áp dụng cho những trò chơi ảo như game Pac-Man, mà nó thường áp dụng cho các bài toán thực tế. Mà bài toán thực tế sẽ cho ra hậu quả thực tế với chi phí thực tế. Vì vậy, việc thử tất cả các trường hợp có thể xảy ra là không khả thi.

Do đó chúng ta cần phải cân bằng giữa **Exploration** (Khám phá) và **Exploitation** (Khai thác). Exploration là việc tìm kiếm và thử nghiệm các State mới, trái lại, Exploitation là việc tận dụng và cải thiện các State đã từng đạt được.

Nếu chỉ Exploration thì Agent sẽ không thể học được gì mà lại rất tốn kém, còn nếu chỉ Exploitation thì Agent sẽ mãi bị mắc kẹt tại vài State chưa phải là tối ưu.

Cách triển khai tốt nhất là chúng ta sẽ thực hiện Exploration ở những Episode đầu tiên, giúp cho Agent khám phá được nhiều State nhất có thể, sau đó thực hiện song song Exploration và Exploitation để cải thiện thông tin học được và cuối cùng là tập trung vào Exploitation.

#### Xây dựng Exploration và Exploitation

Để thực hiện điều này, chúng ta sẽ cho một hệ số $\epsilon$ với giá trị khởi tạo tuỳ ý (nên gần với $1$). Hệ số này sẽ bị giảm dần theo số Episode đã thực hiện bởi một hệ số phân rã $\xi$:

$$
\begin{align}
\epsilon_t = \epsilon_0 \times \xi^t
\end{align}
$$

Ta sẽ tạo ngẫu nhiên một số $\alpha$ theo [Uniform Distribution](https://en.wikipedia.org/wiki/Continuous_uniform_distribution) (Phân phối đều):

$$
\begin{align}
\alpha \leftarrow \mathcal{U}(0, 1) \\
\end{align}
$$

Nếu $\alpha$ nó nằm trong phạm vi của $\epsilon$ thì Agent sẽ thực hiện Exploration, ngược lại sẽ thực hiện Exploitation:

$$
\begin{align}
\begin{cases}
\text{Exploration} &\text{if } \alpha < \epsilon_t \\
\text{Exploitation} &\text{otherwise}
\end{cases}
\end{align}
$$

Để dễ hình dung, chúng ta sẽ xem xét một ví dụ với $\xi = 0.99$ trong $100$ Episode:

$$
\begin{aligned}
\text{Episode } 0&: \epsilon_0 = 0.95 \\
\text{Episode } 1&: \epsilon_1 = \epsilon_0 \times \xi = 0.95 \times 0.99 \approx 0.94 \\
\text{Episode } 2&: \epsilon_2 = \epsilon_1 \times \xi = 0.94 \times 0.99 \approx 0.93 \\
&\dots \\
\text{Episode } 50&: \epsilon = \epsilon_{49} \times \xi = 0.58 \times 0.99 \approx 0.57 \\
&\dots \\
\text{Episode } 100&: \epsilon = \epsilon_{99} \times \xi^{100} = 0.35 \times 0.99 \approx 0.35 \\
\end{aligned}
$$

Có thể thấy ở những Episode đầu tiên, Agent sẽ thực hiện Exploration với xác suất rất cao, sau đó sẽ dần dần giảm xuống và tập trung vào Exploitation.

Ở lần thứ $100$, xác suất Exploration sẽ chỉ còn $35\%$ và $65\%$ còn lại là Exploitation, một kết quả khá tốt.

### Thuật toán

Chúng ta đã qua hết những thứ cần thiết để xây dựng thuật toán. Thuật toán của ADP rất đơn giản, nó gồm 3 bước:

#### Actuate

Đây là bước Agent lựa chọn Action $a$ để thực hiện dựa trên State hiện tại $s$ và Policy $\pi$.

Quá trình này tuân theo hệ số $\epsilon$ đã xây dựng ở trên. Nếu là Exploration thì Agent sẽ lựa chọn Action $a$ ngẫu nhiên, ngược lại sẽ lựa chọn Action $a$ tốt nhất, chính là từ Policy $\pi$.

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

Reward và Transition Model sẽ được cập nhật dựa trên thông tin này bằng những công thức đã xây dựng ở trên.

$$
\begin{align}
(s', r) &= \mathcal{B}(s, a) \notag \\
n(s' \mid s, a) &= n(s' \mid s, a) + 1 \notag \\
\mathcal{T}(s' \in S \mid a, s) &= \frac{n(s' \mid s, a)}{n(s, a)}
\end{align}
$$

Nếu là lần đầu tiên Agent đến State $s'$ thì Reward và Value của State $s'$ sẽ được cập nhật bằng Reward $r$ nhận được:

$$
\begin{align}
\mathcal{R}(s') &= r \notag \\
\mathcal{V}(s') &= r
\end{align}
$$

#### Policy Improvement

Khác với 2 bước trên được thực hiện ở mỗi Action, Policy Improvement chỉ được thực hiện sau khi kết thúc một Episode. Bước này sẽ cập nhật lại Policy $\pi$ và Value $\mathcal{V}$ dựa trên Reward $\mathcal{R}$ và Transition Model $\mathcal{T}$ đã xây dựng trong Episode vừa rồi.

Quá trình cập nhật sẽ được thực hiện bằng Policy Iteration hoặc Value Iteration trong MDP.

$$
\begin{align}
(\pi, \mathcal{V}) &= \text{Policy/Value Iteration}(\mathcal{R}, \mathcal{T}, \pi, \mathcal{V}) \notag \\
\epsilon &= \epsilon \times \xi \\
\end{align}
$$

### Kết luận

Lấy ví dụ từ series trước, sau khi chạy thuật toán với 100 Episode, chúng ta có tổng Reward nhận được như sau:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/adp-rewards.png"
    alt="Reward nhận được sau 1000 Episode"
/>
</figure>

Còn đây là tỉ lệ thắng qua mỗi Episode:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/adp-winning-rate.png"
    alt="Tỉ lệ thắng nhận được sau 1000 Episode"
/>
</figure>

Cuối cùng là Value tính được:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/adp-values.png"
    alt="Value sau 1000 Episode"
/>
</figure>

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/reinforcement_learning](https://github.com/SnowyField1906/ai-general-research/reinforcement_learning).

### Thuật toán chính

Xem tại [ADPLearning.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/ADPLearning.py).

#### Khởi tạo

```python
def __init__(self, n_states, blackbox_move):
    self.n_states = n_states
    self.transition_threshold = T.TRANSITION_THRESHOLD

    self.reward_function = np.zeros(n_states)
    self.transition_model = np.zeros((n_states, A.LEN, n_states))
    self.policy = np.random.randint(A.LEN, size=n_states)
    self.values = np.zeros(n_states)

    self.count_state = np.zeros(n_states)
    self.count_action = np.zeros((n_states, A.LEN))
    self.count_outcome = np.zeros((n_states, A.LEN, n_states))

    self.blackbox_move = blackbox_move
```

#### Percept và Actuate

- Percept:

```python
def percept(self, state, action, next_state, reward):
    if self.count_state[next_state] == 0:
        self.values[next_state] = reward
        self.reward_function[next_state] = reward
        self.count_state[next_state] = 1

    self.count_action[state, action] += 1
    self.count_outcome[state, action, next_state] += 1
    self.transition_model[state, action] = self.count_outcome[state, action] / self.count_action[state, action]
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
        self.percept(state, action, next_state, reward)

        if reward in T.TERMINAL:
            break
        else:
            state = next_state
```

- Improvement:

```python
def policy_improvement(self):
    solver = PolicyIteration(
        self.reward_function,
        self.transition_model,
        init_policy=self.policy,
        init_value=self.values
    )
    solver.train()
    self.policy = solver.policy
    self.values = solver.values
    self.transition_threshold *= T.DECAY_FACTOR
```

#### Thuật toán ADP

```python
def train(self, start_state):
    for i in range(T.EVALUATION_LIMIT):
        self.one_evaluation(start_state)
        self.policy_improvement()
```

### Các hàm phụ trợ

Xem tại [Visualizer.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/Visualizer.py).

### Kiểm thử

Xem tại [test-ADPLearning.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/test-ADPLearning.py).
