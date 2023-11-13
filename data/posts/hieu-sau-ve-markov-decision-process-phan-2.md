---
title: Hiểu sâu về Markov Decision Process (Phần 2 - Policy Iteration)
date: '2023-11-12'
tags: ['Reinforcement Learning', 'Machine Learning', 'Probability', 'Mathematics']
draft: false
summary: Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration
layout: PostView
thumbnail: '/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png'
---

_Markov Decision Process (MDP) là một bài toán Dynamic Programming (Quy hoạch Động) được sử dụng rất nhiều trong các lĩnh vực công nghệ và đóng vai trò đặc biệt trong Reinforcement Learning (Học Tăng cường). MDP được sử dụng để mô hình hóa việc ra quyết định trong các tình huống mà kết quả là một phần ngẫu nhiên và một phần dưới sự điều khiển của người ra quyết định._

_Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png" alt="Hiểu sâu về Markov Decision Process" />

Khuyến nghị đọc trước [Phần 1](https://snowyfield.software/posts/hieu-sau-ve-markov-decision-process-phan-1) để sẵn sàng trước khi đi vào bài viết này.

## Nhắc lại

Ở phần trước chúng ta đã biết được nhiệm vụ của bài toán MDP là tìm ra một Policy $\pi$ để tối ưu sao cho Cumulative Reward $\mathcal{C}$ là lớn nhất với các Reward $r$ nhận được ở mỗi State $s$.

Tuy nhiên việc tìm Policy một cách ngẫu nhiên có thể mất đến $4^{16}$ lần thử nghiệm, do đó chúng ta cần phải tìm một cách tối ưu hơn để tìm ra Policy.

Chúng ta sẽ sử dụng lại các quy ước và những gì đã triển khai ở phần trước.

## Khái niệm

**Policy Iteration** (Lặp theo Policy) là một thuật toán để tìm ra Policy tối ưu. Trái ngược với **Value Iteration** (Lặp theo Value), thuật toán này sẽ tìm ra Policy tối ưu bằng cách tạo Policy ngẫu nhiên trước, sau đó thực hiện các lần lặp để cải tiến Policy cho đến khi không còn thay đổi nào nữa.

Mỗi lần lặp sẽ thực hiện 2 bước:

1. **Policy Evaluation** (Đánh giá Policy): Tìm ra các Value mới (tối ưu hơn) từ Policy hiện tại.
2. **Policy Improvement** (Cải tiến Policy): Thay đổi các Action trong Policy theo các Value mới.

## Các thành phần mới

### Value

#### Khái niệm Value

**Value** (Trị số) hay **Utility** (Tiện ích) là một giá trị thể hiện mức độ "tiềm năng" của một State. Value càng cao thì State đó càng gần với Terminal State (theo Policy hiện tại).

Lí do là vì sẽ có một vài State có Reward như nhau, nhưng thực tế nó không tiềm năng như nhau. Ví dụ, có 2 công ty đều có cùng lợi nhuận ở thời điểm hiện tại, nhưng công ty A kinh doanh một mặt hàng có tiềm năng trong tương lai, còn công ty B kinh doanh một mặt hàng được dự đoán là sẽ bị lỗi thời. Do đó, chúng ta cần phải tránh **đầu tư** (đi đến) **công ty** (State) B.

Chúng ta kí hiệu Value là $v \in \mathbb{R}$, với $n$ là số lượng State có thể đến được. Vì mỗi State tương ứng với một Value, ta có thể truy xuất một Value từ một State bằng mapping function $\mathcal{V}$:

$$
\begin{align}
\mathcal{V} : S &\mapsto \mathbb{R} \notag \\
\mathcal{V}(s) &= v \\
\end{align}
$$

Chúng ta sẽ phải tối ưu $\mathcal{V}$ sao cho với một State càng gần đích thì sẽ trả về một Value cao hơn.

#### Triển khai Value trong game Pac-Man

Như đã nói ở trên, tuy các vị trí là đường đi có Reward đều là $-0.1$, nhưng chúng ta cần tránh đi đến các vị trí xa thức ăn mà tập trung đi đến các vị trí gần thức ăn.

### Discount Factor

#### Khái niệm Discount Factor

Ở phần trước, chúng ta đã quên mất một trường hợp là sẽ ra sao nếu Agent bị mắc kẹt (lặp vô hạn)? Khi đó Cumulative Reward sẽ là âm vô cùng.

Để tránh giá trị này, chúng ta sẽ sử dụng **Discount Factor** (Hệ số Chiết khấu) $\gamma \in [0, 1]$ để giảm giá trị của các Reward trong tương lai sau mỗi Action.

$$
\begin{align}
\mathcal{C}(r = R^+) &= \sum_{t=0}^{p-1} \gamma^t r_t \notag \\
\end{align}
$$

Với việc nhân với $\gamma^t$ thì các Reward trong tương lai sẽ giảm dần theo thời gian, khi $p \to \infty$ thì:

$$
\begin{align}
\lim_{p \to \infty} \mathcal{C}(r = R^+) &= \lim_{p \to \infty} \sum_{t=0}^{p-1} \gamma^t r_t \notag \\
&= r_0 + \gamma r_1 + \gamma^2 r_2 + \dots \notag \\
&= \frac{1}{1 - \gamma} \arg \max_{r_t \in r} (r_t) \notag \\
\end{align}
$$

#### Triển khai Discount Factor trong game Pac-Man

Chúng ta sẽ cho Discout Factor là $\gamma = 0.85$. Khi đó Cumulative Reward sẽ là:

$$
\begin{align}
\mathcal{C}(r) &= \sum_{t=0}^{p-1} \gamma^t r_t \notag \\
&= r_0 + 0.85 r_1 + 0.7225 r_2 + \dots \notag \\
\end{align}
$$

## Xây dựng Policy Iteration

### Xây dựng công thức cho Policy

Ở phần trước chúng ta chỉ đề cập đến Policy là một hàm mapping từ State sang Action, phần này chúng ta sẽ thiết lập thuật toán của Policy.

Policy và Value có mối quan hệ mật thiết với nhau, Value được tính dựa trên Policy, và Policy sẽ thay đổi theo Value. Policy ban đầu sẽ được tạo ngẫu nhiên, sau đó tính Value dựa trên Policy đó, và cuối cùng cập nhật lại Policy dựa trên Value mới.

Hành động này sẽ được lặp đi lặp lại đến khi Policy không còn thay đổi. Vì Policy sẽ cho ra Action dẫn đến State có Value cao nhất trong các State có thể đến được. Do đó thuật toán cập nhật Policy sau khi tính được Value mới đơn giản như sau:

$$
\begin{align}
\mathcal{\pi}(s) = \arg \max_{a \in A} [\mathcal{V}(\mathcal{M}(s, a))] \\
\end{align}
$$

### Xây dựng công thức cho Value

Chúng ta đã biết Value là một giá trị thể hiện mức độ "tiềm năng" của một State, Value càng cao thì State đó càng gần với Terminal State (đối với Policy hiện tại). Do đó chúng ta sẽ định nghĩa Value của một State là Cumulative Reward mà Agent có thể nhận được trong một Episode khi bắt đầu tại State đó.

#### Bỏ qua Random Rate

Ta có công thức tính Value của một State $s_0$ là Cumulative Reward của từng State kế tiếp tuân theo Policy:

$$
\begin{align}
\mathcal{V}(s_0) &= \sum_{t = 0} \gamma^t \mathcal{R}(s_t) \\
\end{align}
$$

Bằng một vài phép biến đổi đơn giản, ta có mối quan hệ giữa Value của State $s_0$ và State kế theo của nó:

$$
\begin{align}
\mathcal{V}(s_0) &= \mathcal{R}(s_0) + \gamma \mathcal{V}(s_1) \\
\end{align}
$$

Chứng minh:

$$
\begin{align}
\mathcal{V}(s_0) &= \mathcal{R}(s_0) + \gamma \mathcal{R}(s_1) + \gamma^2 \mathcal{R}(s_2) + \dots \notag \\
&= \mathcal{R}(s_0) + \gamma (\mathcal{R}(s_1) + \gamma \mathcal{R}(s_2) + \dots) \notag \\
&= \mathcal{R}(s_0) + \gamma \mathcal{V}(s_1) \notag \\
\end{align}
$$

Để dễ hình dung, hãy xem qua hình bên dưới:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-policy-2.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Giả sử Pac-Man bắt đầu tại State $s_0 = 2$, ta sẽ có:

- Bước đầu tiên:

$$
\begin{align}
s_0 &&&= 2 \notag \\
r_0 &= \mathcal{R}(s_0 = 2) &&= -0.1 \notag \\
\end{align}
$$

- Bước thứ hai:

$$
\begin{align}
s_1 &= \mathcal{A}(s_0 = 2, a = \text{right}) &&= 3 \notag \\
r_1 &= \mathcal{R}(s_1 = 3) &&= -0.1 \notag \\
\end{align}
$$

- Bước thứ ba:

$$
\begin{align}
s_2 &= \mathcal{A}(s_1 = 3, a = \text{down}) &&= 7 \notag \\
r_2 &= \mathcal{R}(s_2 = 7) &&= -0.1 \notag \\
\end{align}
$$

- Bước thứ tư:

$$
\begin{align}
s_3 &= \mathcal{A}(s_2 = 7, a = \text{down}) &&= 11 \notag \\
r_3 &= \mathcal{R}(s_3 = 11) &&= -0.1 \notag \\
\end{align}
$$

- Bước cuối cùng (đã đạt Terminal State $s = 15$):

$$
\begin{align}
s_4 &= \mathcal{A}(s_3 = 11, a = \text{down}) &&= 15 \notag \\
r_4 &= \mathcal{R}(s_4 = 15) &&= +10 \notag \\
\end{align}
$$

Khi đó Value của State $s_0 = 2$ là:

$$
\begin{align}
&R^+ &&= [-0.1, -0.1, -0.1, -0.1, +10] \notag \\
\implies &\mathcal{V}(s = 2) &&= \mathcal{C}(r = R^+) \notag \\
&&&= \sum_{t=0}^{4} {0.85}^t r_t \notag \\
&&&= -0.1 + 0.85 \times -0.1 + 0.85^2 \times -0.1 + \ldots \notag \\
&&&\approx 4.901 \notag \\
\end{align}
$$

Tương tự, với State $s_0 = 3$ thì Value là:

$$
\begin{align}
&R^+ &&= [-0.1, -0.1, -0.1, +10] \notag \\
\implies &\mathcal{V}(s = 3) &&\approx 5.884 \notag \\
\end{align}
$$

Ta có thể kiểm chứng công thức $(4)$: $4.901 = -0.1 + 0.85 \times 5.884$.

#### Bao gồm Random Rate

Trong công thức $(3)$ đã mặc định rằng State tiếp theo là State theo Policy:

$$
\begin{align}
s = \mathcal{A}(s, \pi(s))
\end{align}
$$

Tuy nhiên đối với bài toán Stochastic Action, State tiếp theo có thể là một State nằm ngoài Policy theo hệ số Random Rate.

Vì thế, thay vì đặt $\mathcal{V}$ là tổng của các State tiếp theo. Ta sẽ cho $\mathcal{V}$ là [Expected Value](https://en.wikipedia.org/wiki/Expected_value) (Giá trị Kì vọng) của toàn bộ State dựa trên Probability Distribution $\mathcal{P}$ từ phần trước:

$$
\begin{align}
\mathcal{V}(s_0) &= \mathbb{E}_{\mathcal{P}}\left[\sum_{t} \gamma^t \mathcal{R}(s_t) \right] \notag \\
&= \sum\mathcal{P}(s) \gamma^t \mathcal{R}(s) \\
\end{align}
$$

Hay:

$$
\begin{align}
\mathcal{V}(s_0) &= \mathcal{R}(s_0) + \gamma \mathbb{E}_{\mathcal{P}}\left[\mathcal{V}(s_1)\right] \notag \\
&= \mathcal{R}(s_0) + \gamma \sum \mathcal{P}(s_1) \mathcal{V}(s_1) \notag \\
&= \mathcal{R}(s_0) + \gamma \sum \mathcal{T}(s_1 | s_0, \pi(s_0)) \mathcal{V}(s_1) \\
\end{align}
$$

Quay lại với ví dụ trước:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-policy-2.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Thay vì:

$$
\begin{align}
\mathcal{V}(2) &= \mathcal{R}(2) + \gamma \mathcal{V}(3) \notag \\
\mathcal{V}(3) &= \mathcal{R}(3) + \gamma \mathcal{V}(7) \notag \\
\mathcal{V}(7) &= \mathcal{R}(7) + \gamma \mathcal{V}(11) \notag \\
\mathcal{V}(11) &= \mathcal{R}(11) + \gamma \mathcal{V}(15) \notag \\
\mathcal{V}(15) &= \mathcal{R}(15) \notag \\
\end{align}
$$

Ta sẽ chuyển sang:

$$
\begin{align}
\mathcal{V}(2) &= \mathcal{R}(2) + \gamma [0.8 \mathcal{V}(3) + 0.1 \mathcal{V}(2) + 0.1 \mathcal{V}(6)] \notag \\
\mathcal{V}(3) &= \mathcal{R}(3) + \gamma [0.8 \mathcal{V}(7) + 0.1 \mathcal{V}(3) + 0.1 \mathcal{V}(2)] \notag \\
\mathcal{V}(7) &= \mathcal{R}(7) + \gamma [0.8 \mathcal{V}(11) + 0.1 \mathcal{V}(7) + 0.1 \mathcal{V}(6)] \notag \\
\mathcal{V}(11) &= \mathcal{R}(11) + \gamma [0.8 \mathcal{V}(15) + 0.1 \mathcal{V}(11) + 0.1 \mathcal{V}(10)] \notag \\
\mathcal{V}(15) &= \mathcal{R}(15) \notag \\
\end{align}
$$

## Policy Evaluation

Như đã nói ở trên, Policy Evaluation là bước tìm ra các Value mới (tối ưu hơn) từ Policy hiện tại.

Thuật toán Policy Evaluation có 2 cách triển khai chính là **Xấp xỉ Value** và **Giải hệ phương trình tuyến tính**.

Trước hết, ta sẽ mượn lại Polivy ở ví dụ trên:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-policy-2.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Ta sẽ liệt kê Value của toàn bộ State:

$$
\begin{align}
\mathcal{V}(0) &= \mathcal{R}(0) + \gamma [0.8 \mathcal{V}(1) + 0.1 \mathcal{V}(0) + 0.1 \mathcal{V}(4)] \notag \\
\mathcal{V}(1) &= \mathcal{R}(1) + \gamma [0.8 \mathcal{V}(1) + 0.1 \mathcal{V}(0) + 0.1 \mathcal{V}(2)] \notag \\
\mathcal{V}(2) &= \mathcal{R}(2) + \gamma [0.8 \mathcal{V}(3) + 0.1 \mathcal{V}(2) + 0.1 \mathcal{V}(6)] \notag \\
\mathcal{V}(3) &= \mathcal{R}(3) + \gamma [0.8 \mathcal{V}(7) + 0.1 \mathcal{V}(3) + 0.1 \mathcal{V}(2)] \notag \\
\mathcal{V}(4) &= \mathcal{R}(4) + \gamma [0.8 \mathcal{V}(4) + 0.1 \mathcal{V}(0) + 0.1 \mathcal{V}(8)] \notag \\
\mathcal{V}(5) &= 0 \notag \\
\mathcal{V}(6) &= \mathcal{R}(6) + \gamma [0.8 \mathcal{V}(7) + 0.1 \mathcal{V}(2) + 0.1 \mathcal{V}(10)] \notag \\
\mathcal{V}(7) &= \mathcal{R}(7) + \gamma [0.8 \mathcal{V}(11) + 0.1 \mathcal{V}(7) + 0.1 \mathcal{V}(6)] \notag \\
\mathcal{V}(8) &= \mathcal{R}(8) + \gamma [0.8 \mathcal{V}(4) + 0.1 \mathcal{V}(8) + 0.1 \mathcal{V}(9)] \notag \\
\mathcal{V}(9) &= \mathcal{R}(9) + \gamma [0.8 \mathcal{V}(9) + 0.1 \mathcal{V}(8) + 0.1 \mathcal{V}(10)] \notag \\
\mathcal{V}(10) &= \mathcal{R}(10) + \gamma [0.8 \mathcal{V}(14) + 0.1 \mathcal{V}(9) + 0.1 \mathcal{V}(11)] \notag \\
\mathcal{V}(11) &= \mathcal{R}(11) + \gamma [0.8 \mathcal{V}(15) + 0.1 \mathcal{V}(11) + 0.1 \mathcal{V}(10)] \notag \\
\mathcal{V}(12) &= \mathcal{R}(12) + \gamma [0.9 \mathcal{V}(12) + 0.1 \mathcal{V}(13)] \notag \\
\mathcal{V}(13) &= \mathcal{R}(13) + \gamma\mathcal{V}(13) \notag \\
\mathcal{V}(14) &= \mathcal{R}(14) + \gamma [0.8 \mathcal{V}(14) + 0.1 \mathcal{V}(13) + 0.1 \mathcal{V}(15)] \notag \\
\mathcal{V}(15) &= \mathcal{R}(15) + \gamma\mathcal{V}(15) \\
\end{align}
$$

### Cách 1: Xấp xỉ Value

Ở phương pháp này, các Value ban đầu sẽ được khởi tạo bằng $0$. Lúc này, ta chỉ cần thay Value trước đó vào Value hiện tại để tính toán:

$$
\begin{align}
\mathcal{V}(0) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(1) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(2) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(3) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(4) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(5) &= 0 \notag \\
\mathcal{V}(6) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(7) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(8) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(9) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(10) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(11) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(12) &= -0.1 + 0.85 [0.9 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(13) &= -10 + 0.85 \times 0 = -10 \notag \\
\mathcal{V}(14) &= -0.1 + 0.85 [0.8 \times 0 + 0.1 \times 0 + 0.1 \times 0] = -0.1 \notag \\
\mathcal{V}(15) &= 10 + 0.85 \times 0 = 10 \notag \\
\end{align}
$$

Sau đó, ta lại tiếp tục thay các Value vừa rồi vào phương trình để tính toán các Value mới:

$$
\begin{align}
\mathcal{V}(0) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(1) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(2) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(3) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(4) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(5) &= 0 \notag \\
\mathcal{V}(6) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(7) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(8) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(9) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(10) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(11) &= -0.1 + 0.85 [0.8 \times 10 + 0.1 \times -0.1 + 0.1 \times -0.1] = 6.68 \notag \\
\mathcal{V}(12) &= -0.1 + 0.85 [0.9 \times -0.1 + 0.1 \times -0.1] = -0.19 \notag \\
\mathcal{V}(13) &= -10 + 0.85 \times -10 = -18.5 \notag \\
\mathcal{V}(14) &= -0.1 + 0.85 [0.8 \times -0.1 + 0.1 \times -10 + 0.1 \times 10] = -0.17 \notag \\
\mathcal{V}(15) &= 10 + 0.85 \times 10 = 18.5 \notag \\
\end{align}
$$

Tiếp tục một lần quét nữa:

$$
\begin{align}
\mathcal{V}(0) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(1) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(2) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(3) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(4) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(5) &= 0 \notag \\
\mathcal{V}(6) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(7) &= -0.1 + 0.85 [0.8 \times 6.68 + 0.1 \times -0.19 + 0.1 \times -0.19] = 4.41 \notag \\
\mathcal{V}(8) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(9) &= -0.1 + 0.85 [0.8 \times -0.19 + 0.1 \times -0.19 + 0.1 \times -0.19] = -0.26 \notag \\
\mathcal{V}(10) &= -0.1 + 0.85 [0.8 \times  -0.17 + 0.1 \times -0.19 + 0.1 \times 6.68] = 0.34 \notag \\
\mathcal{V}(11) &= -0.1 + 0.85 [0.8 \times 18.5 + 0.1 \times 6.68 + 0.1 \times -0.19] = 13.03 \notag \\
\mathcal{V}(12) &= -0.1 + 0.85 [0.9 \times -0.19 + 0.1 \times -18.5] = -1.82 \notag \\
\mathcal{V}(13) &= -10 + 0.85 \times -18.5 = -25.73 \notag \\
\mathcal{V}(14) &= -0.1 + 0.85 [0.8 \times -0.17 + 0.1 \times -18.5 + 0.1 \times 18.5] = -0.22 \notag \\
\mathcal{V}(15) &= 10 + 0.85 \times 18.5 = 5.73 \notag \\
\end{align}
$$

Như vậy, sau mỗi vòng lặp, các Value sẽ hội tụ đến một "điểm tới hạn". Chúng ta có thể đặt một giá trị $\text{delta}$ theo dõi sự thay đổi lớn nhất của các Value trong mỗi lần lặp. Khi $\text{delta} \leq \epsilon$ (trong đó $\epsilon$ là một giá trị rất nhỏ, có thể đặt là $10^{-3}$), ta có thể cho dừng thuật toán.

### Cách 2: Giải hệ phương trình tuyến tính

Chúng ta đã biết $\mathcal{R}$ cho toàn bộ State và hệ số $\gamma$. Khi đó với 16 State, ta có thể giải hệ phương trình tuyến tính 16 ẩn để tìm ra toàn bộ Value một cách dễ dàng.

Để dễ dàng tính toán, ta sẽ chuyển hệ phương trình $(8)$ về dạng biểu thức $\mathbf{A} \mathbf{x} = \mathbf{b}$.

Trước hết, đặt $\mathbf{P}$ là một ma trận $16 \times 16$:

$$
\begin{align}
\mathbf{s} &= [s_0, s_1, s_2, \dots, s_{15}] \notag \\
&= [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15] \notag \\
\mathbf{\pi} &= [\pi(s_0), \pi(s_1), \pi(s_2), \dots, \pi(s_{15})] \notag \\
&= [2, 1, 2, 3, 2, \text{NaN}, 2, 3, 1, 1, 3, 3, 3, \text{NaN}, 3, \text{NaN}] \notag \\
\mathbf{P} &= \mathcal{T}(s = s_i, a = \pi(s_i)) \quad \forall s_i \in S \notag \\
&= \begin{bmatrix}
0.1 & 0.8 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0.1 & 0.8 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0.1 & 0.8 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0.1 & 0.1 & 0 & 0 & 0 & 0.8 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0.8 & 0 & 0 & 0 & 0.1 & 0.1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0.8 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0.1 & 0.1 & 0 & 0 & 0 & 0.8 & 0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0.8 & 0 & 0 & 0.1 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0.8 & 0 & 0 & 0.1 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0 & 0.8 & 0 & 0 & 0.1 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0.1 & 0.1 & 0 & 0 & 0 & 0.8 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0.8 & 0 & 0 & 0 & 0.1 & 0.1 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0.1 & 0 & 0 & 0 & 0.1 & 0.8 \\
0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 \\
\end{bmatrix} \notag \\
\end{align}
$$

$\mathbf{R}$ và $\mathbf{V}$ là 2 vector có độ dài $16$:

$$
\begin{align}
\mathbf{R} &= [\mathcal{R}(s_0), \mathcal{R}(s_1), \mathcal{R}(s_2), \dots, \mathcal{R}(s_{15})] \notag \\
&= [-0.1, -0.1, -0.1, -0.1, -0.1, 0, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -0.1, -10, -0.1, 10] \notag \\
\mathbf{V} &= [\mathcal{V}(s_0), \mathcal{V}(s_1), \mathcal{V}(s_2), \dots, \mathcal{V}(s_{15})] \notag \\
\end{align}
$$

Khi đó:

$$
\begin{align}
\mathbf{A} &= \mathbf{I}_{16} - \gamma \mathbf{P} \notag \\
\mathbf{b} &= \mathbf{R} \notag \\
\mathbf{x} &= \mathbf{V} \notag \\
\end{align}
$$

Lúc này, ta có thể dễ dàng tìm được $\mathbf{x}$ bằng cách giải phương trình:

$$
\begin{align}
\mathbf{A} \mathbf{x} &= \mathbf{b} \notag \\
\implies \mathbf{A}^{-1} \mathbf{A} \mathbf{x} &= \mathbf{A}^{-1} \mathbf{b} \notag \\
\implies \mathbf{x} &= \mathbf{A}^{-1} \mathbf{b} \notag \\
\implies \mathbf{V} &= (\mathbf{I}_{16} - \gamma \mathbf{P})^{-1} \mathbf{R} \notag \\
\end{align}
$$

### Kết quả

Kết quả của cả 2 cách trên là:

$$
\begin{align}
\mathbf{V} &= [16.861, 21.282, 28.784, 34.470, 12.421, 0, 35.266, 42.932, 17.896, 24.038, 43.830, 53.507, 6.998, -66.667, 53.507, 66.667]
\end{align}
$$

> Kiểm tra phép tính tại đây: [Matrix Calculator](<https://matrixcalc.org/#(I-0.85*{{0.1,0.8,0,0,0.1,0,0,0,0,0,0,0,0,0,0,0},{0,0.1,0.8,0,0,0.1,0,0,0,0,0,0,0,0,0,0},{0,0,0.1,0.8,0,0,0.1,0,0,0,0,0,0,0,0,0},{0,0,0.1,0.1,0,0,0,0.8,0,0,0,0,0,0,0,0},{0.8,0,0,0,0.1,0.1,0,0,0,0,0,0,0,0,0,0},{0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0},{0,0,0.1,0,0,0,0,0.8,0,0,0.1,0,0,0,0,0},{0,0,0,0,0,0,0.1,0.1,0,0,0,0.8,0,0,0,0},{0,0,0,0,0.1,0,0,0,0,0.8,0,0,0.1,0,0,0},{0,0,0,0,0,0.1,0,0,0,0,0.8,0,0,0.1,0,0},{0,0,0,0,0,0,0.1,0,0,0,0,0.8,0,0,0.1,0},{0,0,0,0,0,0,0,0,0,0,0.1,0.1,0,0,0,0.8},{0,0,0,0,0,0,0,0,0.8,0,0,0,0.1,0.1,0,0},{0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0},{0,0,0,0,0,0,0,0,0,0,0.1,0,0,0,0.1,0.8},{0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1}})^(-1)*{{-1/10},{-1/10},{-1/10},{-1/10},{-1/10},{0},{-1/10},{-1/10},{-1/10},{-1/10},{-1/10},{-1/10},{-1/10},{-10},{-1/10},{10}}>)

## Policy Improvement

Sau khi tìm được Value mới, ta sẽ cập nhật Policy hiện tại bằng cách chọn Action có Value lớn nhất cho mỗi State theo công thức $(2)$

### Lần 1

- Trước:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-evaluation.png"
    alt="Ví dụ Evaluation trong game Pac-Man"
/>
</figure>

- Sau:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-improvement.png"
    alt="Ví dụ Evaluation trong game Pac-Man"
/>
</figure>

Kết quả khá khả qua khi sau lần Policy Improvement đầu tiên, Policy đã ở trạng thái tối ưu rồi.

Tuy nhiên, trong thực tế, chúng ta cần phải lặp lại Policy Evaluation và Policy Improvement nhiều lần cho đến khi Policy không thay đổi nữa.

### Lần 2

Hãy thử chạy Policy Evaluation lần 2 dựa trên kết quả của Policy Evaluation và Policy Improvement lần trước:

$$
\begin{align}
\mathbf{V} &= [16.937, 21.282, 28.784, 34.47, 13.246, 0, 35.266, 42.932, 17.971,  24.038, 43.83, 53.507, 7.053, -66.667, 53.507, 66.667] \notag \\
\end{align}
$$

Ta có kết quả sau:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-improvement-2.png"
    alt="Ví dụ Evaluation trong game Pac-Man"
/>
</figure>

### Kết luận

Vì Policy sau lần Improvement th 2 không có sự thay đổi nào so với Policy Improvement lần 1 nên thuật toán sẽ dừng lại.

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/reinforcement_learning](https://github.com/SnowyField1906/ai-general-research/reinforcement_learning).

### Thuật toán chính

Xem tại [PolicyIteration.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/PolicyIteration.py).

#### Khởi tạo

```python
def __init__(self, reward_function, transition_model, gamma=default_gamma, init_policy=None, init_value=None):
    self.n_states = transition_model.shape[0]
    self.reward_function = np.nan_to_num(reward_function)
    self.transition_model = transition_model
    self.gamma = gamma

    if init_policy is None:
        self.policy = np.random.randint(0, A.LEN, self.n_states)
    else:
        self.policy = init_policy
    if init_value is None:
        self.values = np.zeros(self.n_states)
    else:
        self.values = init_value
```

#### Các hàm Policy Evaluation và Policy Improvement

- Policy Evaluation

```python
def one_policy_evaluation(self):
    old = self.values
    new = np.zeros(self.n_states)

    # Approach 1
    # for state in range(self.n_states):
    #     action = self.policy[state]
    #     probability = self.transition_model[state, action]
    #     reward = self.reward_function[state]
    #     new[state] = reward + self.gamma * np.inner(probability, old)

    # Approach 2
    A = np.eye(self.n_states) - self.gamma * self.transition_model[range(self.n_states), self.policy]
    b = self.reward_function
    new = np.linalg.solve(A, b)

    self.values = new
    delta = np.max(np.abs(old - new))

    return delta

def run_policy_evaluation(self, tol=default_tol, epoch_limit=default_evaluation_limit):
    delta = float('inf')
    delta_history = []

    while delta > tol and len(delta_history) < epoch_limit:
        delta = self.one_policy_evaluation()
        delta_history.append(delta)

    return len(delta_history)
```

- Policy Evaluation

```python
def run_policy_improvement(self):
    update_policy_count = 0

    for s in range(self.n_states):
        temp = self.policy[s]
        neighbor_values = np.zeros(A.LEN)

        for a in A.ACTIONS:
            p = self.transition_model[s, a]
            neighbor_values[a] = np.inner(p, self.values)

        self.policy[s] = np.argmax(neighbor_values)

        if temp != self.policy[s]:
            update_policy_count += 1

    return update_policy_count
```

#### Thuật toán Policy Iteration

```python
def train(self, epoch_limit=default_training_limit):
    policy_changes = float('inf')
    eval_sweeps_history = []
    policy_changes_history = []

    while policy_changes != 0 and len(eval_sweeps_history) < epoch_limit:
        eval_sweeps = self.run_policy_evaluation()
        policy_changes = self.run_policy_improvement()
        eval_sweeps_history.append(eval_sweeps)
        policy_changes_history.append(policy_changes)
```

### Các hàm phụ trợ

Xem tại [Visualizer.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/Visualizer.py).

### Kiểm thử

Xem tại [test-World.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/test-PolicyIteration.py).
