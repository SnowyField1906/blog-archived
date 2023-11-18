---
title: Hiểu sâu về Markov Decision Process (Phần 3 - Value Iteration)
date: '2023-11-14'
tags: ['Reinforcement Learning', 'Machine Learning', 'Optimization', 'Probability', 'Mathematics']
draft: false
summary: Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration
layout: PostView
thumbnail: '/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png'
---

_Markov Decision Process (MDP) là một bài toán Dynamic Programming (Quy hoạch Động) được sử dụng rất nhiều trong các lĩnh vực công nghệ và đóng vai trò đặc biệt trong Reinforcement Learning (Học Tăng cường). MDP được sử dụng để mô hình hóa việc ra quyết định trong các tình huống mà kết quả là một phần ngẫu nhiên và một phần dưới sự điều khiển của người ra quyết định._

_Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png" alt="Hiểu sâu về Markov Decision Process" />

Khuyến nghị đọc trước [Phần 2](https://snowyfield.software/posts/hieu-sau-ve-markov-decision-process-phan-2) để sẵn sàng trước khi đi vào bài viết này.

## Nhắc lại

Ở phần trước chúng ta đã biết được khái niệm Value và thuật toán Policy Iteration. Thuật toán này sẽ tìm ra Policy tối ưu bằng cách tạo Policy ngẫu nhiên trước, sau đó thực hiện các lần lặp để cải tiến Policy cho đến khi không còn thay đổi nào nữa.

Tuy nhiên việc thuật toán này tương đối phức tạp khi mỗi lần lặp phải thực hiện 2 bước là Policy Evaluation và Policy Improvement.

Chúng ta sẽ sử dụng lại các quy ước và những gì đã triển khai ở phần trước.

## Khái niệm

**Value Iteration** (Lặp theo Value) là một thuật toán để tìm ra Policy tối ưu. Trái ngược với **Policy Iteration** (Lặp theo Policy), thuật toán này sẽ tìm ra Policy tối ưu bằng cách tạo Value ngẫu nhiên trước, sau đó thực hiện các lần lặp để cải tiến Value cho đến khi không còn thay đổi nào nữa.

Mỗi lần lặp sẽ chỉ thực hiện 1 bước là **Value Evaluation** (Đánh giá Value), bước này là sự kết hợp của 2 bước Policy Evaluation và Policy Improvement ở thuật toán Policy Iteration.

## Xây dựng Value Iteration

Phần này tương đối đơn giản vì một phần là ta đã đi qua Policy Iteration, một phần là thuật toán này được xây dựng dựa trên đó.

Ở phần trước, chúng ta đã biết được 3 công thức quan trọng của Policy Iteration:

- Công thức tính $\mathcal{V}$:

$$
\begin{align}
\mathcal{V}(s_0) &= \mathbb{E}_{\mathcal{P}}\left[\sum_{t} \gamma^t \mathcal{R}(s_t) \right] \notag \\
&= \sum\mathcal{P}(s) \gamma^t \mathcal{R}(s) \\
\end{align}
$$

- Công thức quan hệ giữa Value của State hiện tại và State kế tiếp:

$$
\begin{align}
\mathcal{V}(s_0) &= \mathcal{R}(s_0) + \gamma \mathbb{E}_{\mathcal{P}}\left[\mathcal{V}(s_1)\right] \notag \\
&= \mathcal{R}(s_0) + \gamma \sum \mathcal{P}(s_1) \mathcal{V}(s_1) \notag \\
&= \mathcal{R}(s_0) + \gamma \sum \mathcal{T}(s_1 \mid s_0, \pi(s_0)) \mathcal{V}(s_1) \\
\end{align}
$$

- Công thức tính Policy (Policy Improvement):

$$
\begin{align}
\mathcal{\pi}(s) = \arg \max_{a \in A} \left[\sum \mathcal{T}(s' \mid s, a) \mathcal{V}(s')\right]
\end{align}
$$

Ở công thức $(2)$, ta đã tính Value dựa trên Policy hiện tại là $\pi$, do đó sau mỗi lần cập nhật, ta phải lặp qua các State một lần nữa để sửa lại Policy cho lần tính Value tiếp theo.

Thay vì tính Value dựa trên một Action duy nhất theo Policy, chúng ta có thể tính Value trên toàn bộ Action, sau đó chọn ra Action cho ra Value cao nhất. Bằng cách triển khai này, ta sẽ có thể bỏ qua Policy.

Ý tưởng là vậy, hãy bắt đầu bằng việc triển khai công thức tính Value theo một Action $a_i$ cụ thể:

$$
\begin{align}
\mathcal{V}(s_0 \mid a_i) &= \mathcal{R}(s_0) + \gamma \sum \mathcal{T}(s_1 \mid s_0, a_i) \mathcal{V}(s_1) \\
\end{align}
$$

Khá đơn giản vì ta chỉ cần thay Action theo Policy là $\pi(s_0)$ bằng Action tuỳ ý là $a_i$.

Vậy với một tập:

$$
\begin{align}
A = \{a_0, a_1, a_2, \dots, a_{m - 1}\}
\end{align}
$$

Ta sẽ tính được một tập:

$$
\begin{align}
V(s_0) = \{\mathcal{V}(s_0 \mid a_0), \mathcal{V}(s_0 \mid a_1), \mathcal{V}(s_0 \mid a_2), \dots, \mathcal{V}(s_0 \mid a_{m - 1})\}
\end{align}
$$

Và sau đó chỉ cần lấy Value lớn nhất. Công thức sẽ là:

$$
\begin{align}
\mathcal{V}(s_0) &= \max_{a \in A}\left[\mathcal{R}(s_0) + \gamma \sum \mathcal{T}(s_1 \mid s_0, a) \mathcal{V}(s_1)\right] \notag \\
&= \mathcal{R}(s_0) + \gamma \max_{a \in A}\left[\sum \mathcal{T}(s_1 \mid s_0, a) \mathcal{V}(s_1)\right]
\end{align}
$$

Phương trình trên còn được gọi là [Bellman Equation](https://en.wikipedia.org/wiki/Bellman_equation) (Phương trình Bellman), là tiền đề của rất nhiều lĩnh vực và thuật toán phức tạp sau này.

Từ đây, việc giải bài toán MDP chính là giải phương trình Bellman.

## Value Evaluation

Khác với Policy Evaluation khi chúng ta có thể **Giải hệ phương trình tuyến tính** một cách dễ dàng, phương trình Bellman không cho phép làm vậy vì toán tử $\max$.

Do đó, chúng ta sẽ phải sử dụng phương pháp **Xấp xỉ Value** để giải quyết bài toán này, đó cũng là lí do tại sao phương pháp phức tạp này lại được đề cập trong bài viết trước.

Trước hết, ta sẽ mượn lại bản đồ từ ví dụ trước (không cần quan tâm đến Policy nữa):

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-policy-2.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Ta sẽ chỉ liệt kê một State làm ví dụ, ở phần trước, $\mathcal{V}(11)$ được biểu diễn như sau:

$$
\begin{align}
\mathcal{V}(11) &= \mathcal{R}(11) + \gamma [0.8 \mathcal{V}(15) + 0.1 \mathcal{V}(11) + 0.1 \mathcal{V}(10)] \notag \\
\end{align}
$$

Lần này sẽ khác đi một chút:

$$
\begin{align}
\mathcal{V}(11) &= \mathcal{R}(11) + \gamma \max \begin{bmatrix}
0.8 \mathcal{V}(15) &+ 0.1 \mathcal{V}(11)&+ 0.1 \mathcal{V}(10)&\\
0.1 \mathcal{V}(15) &+ 0.8 \mathcal{V}(11) &&+ 0.1 \mathcal{V}(7) \\
0.1 \mathcal{V}(15) &&+ 0.8 \mathcal{V}(10) &+ 0.1 \mathcal{V}(7) \\
&+0.1 \mathcal{V}(11) &+ 0.1 \mathcal{V}(10) &+ 0.8 \mathcal{V}(7) \\
\end{bmatrix} \notag \\
\end{align}
$$

Ở lần đầu tiên, các Value sẽ được khởi tạo bằng $0$:

$$
\begin{align}
\mathcal{V}(11) &= -0.1 + 0.85 \times \max \begin{bmatrix}
0.8 \times 0 &+ 0.1 \times 0&+ 0.1 \times 0&\\
0.1 \times 0 &+ 0.8 \times 0 &&+ 0.1 \times 0 \\
0.1 \times 0 &&+ 0.8 \times 0 &+ 0.1 \times 0 \\
&+0.1 \times 0 &+ 0.1 \times 0 &+ 0.8 \times 0 \\
\end{bmatrix} \notag \\
&= -0.1 + 0.85 \times \max \begin{bmatrix}
0 \\ 0 \\ 0 \\ 0
\end{bmatrix} \\
&= -0.1
\end{align}
$$

Tiếp tục lần quét thứ 2 (với $\mathcal{V}(15)$, $\mathcal{V}(10)$ và $\mathcal{V}(7)$ đã được tính ở phần trước):

$$
\begin{align}
\mathcal{V}(11) &= -0.1 + 0.85 \times \max \begin{bmatrix}
0.8 \times 10  &+ 0.1 \times -0.1  &+ 0.1 \times -0.1 &\\
0.1 \times 10  &+ 0.8 \times -0.1 &&+ 0.1 \times -0.1 \\
0.1 \times 10 &&+ 0.8 \times -0.1  &+ 0.1 \times -0.1 \\
&+0.1 \times -0.1 &+ 0.1 \times -0.1  &+ 0.8 \times -0.1 \\
\end{bmatrix} \notag \\
&= -0.1 + 0.85 \times \max \begin{bmatrix}
7.98 \\ 0.91 \\ 0.91 \\ -0,1
\end{bmatrix} \\
&= 6.68
\end{align}
$$

Hãy thử thêm một lần quét nữa (với $\mathcal{V}(15)$, $\mathcal{V}(10)$ và $\mathcal{V}(7)$ đã được tính ở phần trước):

$$
\begin{align}
\mathcal{V}(11) &= -0.1 + 0.85 \times \max \begin{bmatrix}
0.8 \times 18.5  &+ 0.1 \times 6.68  &+ 0.1 \times -0.19 &\\
0.1 \times 18.5  &+ 0.8 \times 6.68 &&+ 0.1 \times -0.19 \\
0.1 \times 18.5 &&+ 0.8 \times -0.19  &+ 0.1 \times -0.19 \\
&+0.1 \times 6.68 &+ 0.1 \times -0.19  &+ 0.8 \times -0.19 \\
\end{bmatrix} \notag \\
&= -0.1 + 0.85 \times \max \begin{bmatrix}
15.45 \\ 7.18 \\ 1.68 \\ 0.5
\end{bmatrix} \\
&= 13.03
\end{align}
$$

Kết quả hoàn toàn khớp với ví dụ ở phần trước.

Như vậy, sau mỗi lần quét, các Value sẽ hội tụ đến một "điểm tới hạn". Chúng ta có thể đặt một giá trị $\text{delta}$ theo dõi sự thay đổi lớn nhất của các Value trong mỗi lần quét. Khi $\text{delta} \leq \epsilon$ (trong đó $\epsilon$ là một giá trị rất nhỏ, có thể đặt là $10^{-3}$), ta có thể cho dừng thuật toán.

### Kết luận

Kết quả của thuật toán Value Iteration sẽ hơi khác so với Policy Iteration một chút (có thể kiểm tra lại kết quả ở phần trước).

## Policy Improvement

Value Iteration cũng sẽ có Policy Improvement với thuật toán hoàn toàn tương tự như Policy Iteration. Tuy nhiên thay vì chạy sau mỗi lần quét, ta sẽ chỉ chạy một lần duy nhất sau Value Evaluation khi các Value đã hội tụ.

Đây là kết quả cuối cùng, sau khi chạy Policy Improvement:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-final-vi.png"
    alt="Kết quả Policy trong game Pac-Man"
/>
</figure>

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/reinforcement_learning](https://github.com/SnowyField1906/ai-general-research/reinforcement_learning).

### Thuật toán chính

Xem tại [ValueIteration.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/ValueIteration.py).

#### Khởi tạo

```python
def __init__(self, reward_function, transition_model, init_value=None):
    self.n_states = transition_model.shape[0]
    self.reward_function = np.nan_to_num(reward_function)
    self.transition_model = transition_model

    self.policy = (np.ones(self.n_states) * -1).astype(int)

    if init_value is None:
        self.values = np.zeros(self.n_states)
    else:
        self.values = init_value
```

#### Các hàm Value Evaluation và Policy Improvement

- Value Evaluation

```python
def one_evaluation(self):
    old = self.values
    new = np.zeros(self.n_states)

    for state in range(self.n_states):
        values = np.zeros(A.LEN)
        reward = self.reward_function[state]

        for action in A.ACTIONS:
            probability = self.transition_model[state, action]
            values[action] = reward + T.DISCOUNT_FACTOR * np.inner(probability, self.values)

        new[state] = max(values)

    self.values = new
    delta = np.max(np.abs(old - new))

    return delta
```

- Policy Improvement

```python
def policy_improvement(self):
    for state in range(self.n_states):
        neighbor_values = np.zeros(A.LEN)

        for action in A.ACTIONS:
            probability = self.transition_model[state, action]
            neighbor_values[action] = np.inner(probability, self.values)

        self.policy[state] = np.argmax(neighbor_values)
```

#### Thuật toán Value Iteration

```python
def train(self):
    delta = float('inf')
    delta_history = []

    while delta > T.STOP_CRITERION and len(delta_history) < T.EVALUATION_LIMIT:
        delta = self.one_evaluation()
        delta_history.append(delta)

    self.policy_improvement()
```

### Các hàm phụ trợ

Xem tại [Visualizer.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/Visualizer.py).

### Kiểm thử

Xem tại [test-ValueIteration.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/test-ValueIteration.py).
