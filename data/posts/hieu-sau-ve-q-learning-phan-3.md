---
title: Hiểu sâu về Q-Learning (Phần 3 - Q-Learning)
date: '2023-11-24'
tags: ['Reinforcement Learning', 'Machine Learning', 'Optimization', 'Probability', 'Mathematics']
draft: false
summary: Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Q-Learning cùng với cách xây dựng và triển khai hai thuật toán quan trọng là Adaptive Dynamic Programming và Monte Carlo.
layout: PostView
thumbnail: '/static/images/thumbnails/hieu-sau-ve-q-learning.png'
---

_Q-Learning là một thuật toán Reinforcement Learning (Học Tăng cường). Tuy không dùng đến Neural Network (Mạng Nơ-ron) nhưng thuật toán này vẫn có thể giải quyết được rất nhiều bài toán trong thực tế._

_Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Q-Learning cùng với cách xây dựng và triển khai hai thuật toán quan trọng là **Adaptive Dynamic Programming** (Quy hoạch Động Thích ứng) và **Monte Carlo** (Mô phỏng Monte Carlo)._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/hieu-sau-ve-q-learning.png" alt="Hiểu sâu về Q-Learning" />

Khuyến nghị đọc trước [Phần 2](https://snowyfield.software/posts/hieu-sau-ve-q-learning-phan-2/) để sẵn sàng trước khi đi vào bài viết này.

## Nhắc lại

Chúng ta đã biết cách hoạt động và các khái niệm quan trọng của Markov Decision Process trong series trước. Tuy nhiên đây chỉ là một công cụ dùng để khái quát hoá bài toán Reinforcement Learning (Học Tăng cường). Thực tế, Agent thường không có khả năng biết được các thông tin quan trọng như Reward hay Transition Model.

Để hiểu đơn giản, MDP là một bài toán giúp Agent lập kế hoạch, vì lúc này Agent đã biết được các thông tin quan trọng. Trong khi đó Q-Learning bao gồm cả quá trình học để có được các thông tin này.

**Q-Learning** (Học Q) là một thuật toán giúp Agent có thể học được các thông tin này thông qua việc thử nhiều lần và rút ra kinh nghiệm. Để có thể triển khai được thuật toán này, chúng ta sẽ cần tìm hiểu qua hai thuật toán quan trọng là **Adaptive Dynamic Programming** (Quy hoạch Động Thích ứng) và **Monte Carlo** (Mô phỏng Monte Carlo).

## Khái niệm

Là một sự kết hợp giữa giữa ADP và Monte Carlo, Q-Learning sẽ có những khái niệm chung với hai thuật toán này để giải quyết những vấn đề tồn đọng trong các thuật toán trên.

## Xây dựng Q-Learning

Như ta đã biết ở bài viết về Monte Carlo, chúng ta đã triển khai một khái niệm mới gọi là **Q-Value** được lưu trữ trong một **Q-Table**. Các Q-Value được cập nhật theo quy tắc Monte Carlo, tức là lấy trung bình của các C-Value (giá trị tính được sau mỗi Episode). Tuy nhiên chúng ta sẽ có một cách tiếp cận khác trong Q-Learning.

> Phần này giả sử người đọc đã nắm được các kí hiệu và ví dụ ở series [Hiểu sâu về Markov Decision Process](https://snowyfield.software/posts/hieu-sau-ve-markov-decision-process/).

### Xây dựng Q-Value

Hãy quay lại công thức cập nhật Q-Value của Monte Carlo:

$$
\begin{align}
\mathbf{Q}_t &= \mathbf{Q}_{t-1} + \frac{1}{t}(\mathbf{C}_t - \mathbf{Q}_{t-1}) \\
\end{align}
$$

Công thức này có thể được viết lại như sau:

$$
\begin{align}
\text{New} &= \text{Old} + \text{Step} (\text{Target} - \text{Old}) \\
\end{align}
$$

Trong đó:

- $\text{New}$ là Q-Table mới
- $\text{Old}$ là Q-Table cũ
- $\text{Step}$ là bước nhảy
- $\text{Target}$ là C-Table đã tìm được tại Episode hiện tại

Nếu để ý kĩ, công thức này rất giống với Gradient Descent hay các thuật toán Optimizer khác:

$$
\begin{align}
\theta_t &= \theta_{t-1} + \alpha \nabla L(\theta_{t-1}) \\
\end{align}
$$

Khi đó, $(\mathbf{C}_t - \mathbf{Q}_{t-1})$ có ý nghĩa như là $\text{error}$, sự khác biệt giữa kiến thức cũ và mới. Trong Reinforcement Learning, $\text{error}$ này được gọi là **Temporal Difference** (Chênh lệch Tạm thời).

Còn $\frac{1}{t}$, được gọi là **sample-average** (trung bình mẫu) có ý nghĩa như là $\alpha$ (learning rate), thể hiện mức độ ảnh hưởng của $\text{error}$ lên $\text{New}$. Có thể để ý rằng nếu $\text{Step} = 1$ thì $\text{New} = \text{Old} + \text{error}$, tức là chúng ta sẽ quên hết kiến thức cũ và chỉ thu nạp kiến thức mới. Ngược lại, nếu $\text{Step} = 0$ thì $\text{New} = \text{Old}$, tức là chúng ta sẽ không học được gì.

#### Xây dựng Step

Để xem xét liệu chúng ta có thể loại bỏ tham số $\frac{1}{t}$ và thay thế bằng một hằng số learning rate $\alpha$ hay không, ta sẽ phải xem xét qua các ví dụ sau:

Cho các Q-Value ban đầu như sau:

$$
\begin{aligned}
\mathbf{Q} = [3, 6, 2, 8, 4, 9, 1, 5, 7, 10]
\end{aligned}
$$

Chúng ta sẽ thử tìm giá trị trung bình bằng cách cập nhật Q-Value theo 2 cách, một là với $\frac{1}{t}$ theo Monte Carlo và một là với $\alpha = 0.2$.

Chúng ta sử dụng code Python sau để thực hiện việc này:

```python
def update_q_value(tar, old, step):
    return old + step * (tar - old)

c_values = [4, 7, 5, 1, 9, 8, 2, 10, 3, 6]
q_values_sa = []
q_values_lr = []

for i in range(1, len(c_values) + 1):
    tar = c_values[i - 1]

    old_sa = q_values_sa[-1] if i > 1 else 0
    old_lr = q_values_lr[-1] if i > 1 else 0

    step_sa = 1 / i
    step_lr = 0.2

    q_values_sa.append(update_q_value(tar, old_sa, step_sa))
    q_values_lr.append(update_q_value(tar, old_lr, step_lr))

print("Q-Value (sample-average):", round(q_values_sa[-1], 2))
print("Q-Value (learning rate):", round(q_values_lr[-1], 2))
```

Kết quả thu được như sau:

```text
Q-Value (sample-average): 5.5
Q-Value (learning rate): 5.42
```

Có thể thấy rằng sử dụng learning rate cũng cho kết quả xấp xỉ với sample-average:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/comparison-q-learning.png"
    alt="Q-Value với learning rate và sample-average"
/>
</figure>

Còn đây là với $\alpha = 0.4$:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/comparison-q-learning-2.png"
    alt="Q-Value với learning rate và sample-average"
/>
</figure>

Qua đó, với một learning rate nhỏ, chúng ta có xu hướng tin vào kinh nghiệm trong quá khứ (quá trình học ít dao động hơn), còn với một learning rate lớn, chúng ta có xu hướng tin vào những gì đang xảy ra (quá trình học dao động nhiều hơn).

Trong khi đó, với việc sử dụng sample-average, các Q-Value sẽ tuân theo trung bình cộng của các C-Value một cách cực đoan.

Do đó, chúng ta có thể kiểm soát được khả năng học của Agent cũng như cho ra hiệu suất tốt hơn nhờ vào learning rate.

#### Loại bỏ C-Table

Như đã biết, Monte Carlo chia quá trình học thành nhiều Episode và cập nhật Q-Table sau mỗi Episode. Trong đó, mỗi Episode như là một lần học riêng biệc, dẫn đến các lần học độc lập với nhau, việc thiếu tính liên kết giữa các lần học này sẽ dẫn đến việc học không hiệu quả.

Để thực hiện việc cập nhật Q-Table một cách liên tục sau mỗi Episode, chúng ta sẽ dùng lại ví dụ so sánh Q-Value và Value ở bài viết trước:

$$
\begin{align}
\mathcal{V}(s) &= \max_a \left[ \mathcal{R}(s) + \gamma \sum \mathcal{T}(s' | s, a) \mathcal{V}(s') \right] \notag \\
&= \max_a \left[ \mathcal{Q} (s, a) \right] \\
\end{align}
$$

Vì Q-Value có tính chất tương tự như Value nên chúng ta có thể sử dụng lại công thức cập nhật Value trong một Episode:

$$
\begin{align}
\mathcal{V}(s) &= \mathcal{R}(s) + \gamma \mathcal{V}(s') \notag \\
\implies \mathcal{Q}(s, a) &= \mathcal{R}(s) + \gamma \max_{a'} \left[ \mathcal{Q} (s', a') \right] \\
\end{align}
$$

Đây sẽ là công thức thay thế cho C-Table, hay nói cách khác, đây là $\text{Target}$ học được từ mỗi Episode.

#### Xây dựng Q-Table

Kết hợp các công thức này lại, chúng ta sẽ có công thức cập nhật Q-Value mới:

$$
\begin{align}
\text{New} &= \text{Old} + \text{Step} (\text{Target} - \text{Old}) \notag \\
\mathcal{Q}(s, a)_t &= \mathcal{Q}(s, a)_{t-1} + \alpha \left[ \mathcal{R}(s) + \gamma \max_{a'} \left[ \mathcal{Q} (s', a')_{t-1} \right] - \mathcal{Q}(s, a)_{t-1} \right] \\
\end{align}
$$

### Thuật toán

Chúng ta đã qua hết những thứ cần thiết để xây dựng thuật toán. Các bước thực hiện của thuật toán Monte Carlo giống với ADP, đều gồm 3 bước dưới đây:

#### Actute

Đây là bước Agent lựa chọn Action $a$ để thực hiện dựa trên State hiện tại $s$ và Policy $\pi$.

Bước này không có thay đổi gì với cả ADP lẫn MC. Đều dựa vào một hệ số phân rã $\epsilon$ để quyết định xem Agent sẽ thực hiện Exploration hay Exploitation. Nếu là Exploration thì Agent sẽ lựa chọn Action $a$ ngẫu nhiên, ngược lại sẽ lựa chọn Action $a$ tốt nhất, chính là từ Policy $\pi$.

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

Q-Table sẽ được cập nhật dựa trên thông tin này bằng những công thức đã xây dựng ở trên:

$$
\begin{align}
(s', r) &= \mathcal{B}(s, a) \notag \\
\mathbf{q} &= \max_{a'} \left[ \mathbf{Q}(s', a') \right] \notag \\
\mathbf{Q}[s, a] &= \mathbf{Q}[s, a] + \alpha \left( r + \gamma \mathbf{q} - \mathbf{Q}[s, a] \right) \\
\end{align}
$$

Thuật toán này có nghĩa là với bất kì cặp State-Action nào xuất hiện, ta sẽ dùng Q-Table hiện tại để tính Q-Value mới và dùng nó để cải thiện Q-Table.

Vì Policy $\pi$ dựa trên Q-Table, nên nơi nào Q-Table được cập nhật thì Policy cũng sẽ được cập nhật theo. Do đó chúng ta sẽ không cần phải thực hiện Policy Improvement sau mỗi Episode như ADP hay MC mà sẽ thêm một bước cập nhật Policy tại đây:

$$
\begin{align}
\pi(s) &= \arg \max_a \mathbf{Q}[s, a] \\
\end{align}
$$

#### Decay

Trong ADP và MC, chúng ta thực hiện điều này ở bước Policy Improvement. Tuy nhiên, Policy Improvement trong Q-Learning đã được thực hiện ở bước Percept, do đó chúng ta sẽ thực hiện riêng việc giảm dần hệ số phân rã $\epsilon$ ở cuối mỗi Episode:

$$
\begin{align}
\epsilon &= \epsilon \times \xi \\
\end{align}
$$

### Kết luận

Lấy ví dụ từ series trước, sau khi chạy thuật toán với 100 Episode, chúng ta có tổng Reward nhận được như sau:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/q-rewards.png"
    alt="Reward nhận được sau 1000 Episode"
/>
</figure>

Còn đây là tỉ lệ thắng qua mỗi Episode:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/q-winning-rate.png"
    alt="Tỉ lệ thắng nhận được sau 1000 Episode"
/>
</figure>

Cuối cùng là Policy tính được:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/q-policy.png"
    alt="Policy sau 1000 Episode"
/>
</figure>

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/reinforcement_learning](https://github.com/SnowyField1906/ai-general-research/reinforcement_learning).

### Thuật toán chính

Xem tại [QLearning.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/QLearning.py).

#### Khởi tạo

```python
def __init__(self, n_states, blackbox_move):
    self.n_states = n_states
    self.transition_threshold = T.TRANSITION_THRESHOLD

    self.q_table = np.zeros((n_states, A.LEN))
    self.policy = np.random.randint(A.LEN, size=n_states)

    self.blackbox_move = blackbox_move
```

#### Percept và Actuate

- Percept:

```python
def percept(self, state, action, next_state, reward):
    td_error = reward + T.DISCOUNT_FACTOR * np.max(self.q_table[next_state]) - self.q_table[state, action]
    self.q_table[state, action] += T.LEARNING_RATE * td_error
    self.policy[state] = np.argmax(self.q_table[state])
```

- Actuate:

```python
def actuate(self, next_state):
    if np.random.uniform() <= self.transition_threshold:
        return np.random.randint(A.LEN)
    else:
        return self.policy[next_state]
```

#### Evaluation

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

    self.transition_threshold *= T.DECAY_FACTOR
```

#### Thuật toán Q-Learning

```python
def train(self, start_state):
    for i in range(T.EVALUATION_LIMIT):
        self.one_evaluation(start_state)
```

### Các hàm phụ trợ

Xem tại [Visualizer.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/Visualizer.py).

### Kiểm thử

Xem tại [test-QLearning.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/test-QLearning.py).
