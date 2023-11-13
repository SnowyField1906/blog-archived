---
title: Hiểu sâu về Markov Decision Process (Phần 1 - Tổng quan)
date: '2023-11-10'
tags: ['Reinforcement Learning', 'Machine Learning', 'Probability', 'Mathematics']
draft: false
summary: Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration
layout: PostView
thumbnail: '/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png'
---

_Markov Decision Process (MDP) là một bài toán Dynamic Programming (Quy hoạch Động) được sử dụng rất nhiều trong các lĩnh vực công nghệ và đóng vai trò đặc biệt trong Reinforcement Learning (Học Tăng cường). MDP được sử dụng để mô hình hóa việc ra quyết định trong các tình huống mà kết quả là một phần ngẫu nhiên và một phần dưới sự điều khiển của người ra quyết định._

_Loạt bài viết này sẽ giúp chúng ta hiểu sâu về Markov Decision Process cùng với cách xây dựng và triển khai hai thuật toán phổ biến là Policy Iteration và Value Iteration._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/hieu-sau-ve-markov-decision-process.png" alt="Hiểu sâu về Markov Decision Process" />

Khuyến nghị đọc trước [Giới thiệu về Markov Chain và ứng dụng](https://snowyfield.software/posts/gioi-thieu-ve-markov-chain-va-ung-dung) để sẵn sàng trước khi đi vào bài viết này.

## Khái niệm

**Markov Decision Process** (Quy trình Quyết định Markov) là một quy trình quyết định trong môi trường ngẫu nhiên. Nó được mô hình hóa bằng một **Markov Chain** (Xích Markov) với các hành động được thực hiện bởi **Agent** (Tác nhân). Do đó các hành động trong tương lai sẽ không bị ảnh hưởng bởi những hành động trong quá khứ.

MDP là tiền đề của bài toán [Reinforcement Learning](https://en.wikipedia.org/wiki/Reinforcement_learning) (Học Tăng cường), chúng ta sẽ bỏ qua các khái niệm về Reinforcement Learning và cùng nhau xây dựng toàn bộ từ đầu.

Để dễ hình dung, loạt bài viết này sẽ xoay quanh tựa game Pac-Man làm ví dụ vì đây vừa là một game quen thuộc, vừa là một bài toán kinh điển trong Reinforcement Learning. MDP sẽ đóng vai trò dẫn đường cho Pac-Man đi đến đích (thức ăn) một cách nhanh nhất trong mọi trường hợp.

## Các thành phần cơ bản và thiết lập game Pac-Man

Đầu tiên, chúng ta cần phải nắm vững định nghĩa của các thành phần và các quy ước kí hiệu trong MDP.

Bên cạnh đó ta cũng sẽ song song thiết lập game Pac-Man cho phần sắp tới và các bài viết sau.

### Agent

#### Khái niệm Agent

**Agent** (Tác nhân) là một thực thể nằm bên trong **Environment** (Môi trường), đặc điểm quan trọng của Agent là nó có thể đưa ra quyết định và thực hiện các **Action** (Hành động) hợp lệ bên trong Environment đó.

Một Environment có thể có nhiều Agent, và tuy không được định nghĩa rõ ràng trong các bài toán, nhưng tính chất của Agent sẽ phân loại các bài toán trong Reinforcement Learning.

#### Các loại Agent

Agent có 2 loại là **Single Agent** (Đơn Tác nhân) và **Multi Agent** (Đa Tác nhân).

Trong **Multi Agent**, sẽ được chia thêm làm 2 loại là **Competitive** (Cạnh tranh) và **Collaborative** (Hợp tác).

##### Single Agent

**Single Agent** (Đơn Tác nhân) là Agent đơn lẻ, tức là chỉ có một Agent trong một Environment.

Ví dụ, thoát khỏi mê cung là một bài toán Single Agent, vì chỉ có một người chơi trong một mê cung.

##### Multi Agent

**Multi Agent** (Đa Tác nhân) là Agent đa lẻ, tức là có nhiều Agent trong một Environment.

Ví dụ về Multi Agent sẽ được đề cập ở bên dưới.

##### Competitive

Agent được gọi là **Competitive** (Cạnh tranh) khi nó sẽ phải cạnh tranh với các Agent khác trong cùng một Environment để đạt được mục đích mong muốn.

Ví dụ, cờ vua có tính chất Competitive, vì mỗi Agent sẽ phải cạnh tranh với Agent khác để giành chiến thắng.

##### Collaborative

Agent được gọi là **Collaborative** (Hợp tác) khi nó có thể hợp tác với các Agent khác trong cùng một Environment để đạt được mục đích chung.

Ví dụ, xe tự lái có tính chất Collaborative, vì các Agent sẽ phải hợp tác với nhau để tránh va chạm.

#### Triển khai Agent cho game Pac-Man

Agent chính là Pac-Man, thực thể có thể lựa chọn và thực hiện các Action như di chuyển lên, xuống, trái, phải đến khi đạt được mục đích.

### Task

**Task** (Nhiệm vụ) phản ánh công việc mà Agent sẽ phải thực hiện.

#### Các loại Task

Task có 2 loại là **Episodic** (Theo tập) và **Continuing** (Liên tục).

##### Episodic

Task được gọi là **Episodic** (Theo tập) khi nó có **Terminal State** (Trạng thái Kết thúc) và Agent sẽ phải thực hiện các Action để đạt được Terminal State đó. Sau khi kết thúc, Agent sẽ bắt đầu lại từ đầu, mỗi lần như vậy được gọi là một **Episode** (Tập).

Ví dụ, cờ vua có tính chất Episodic, vì ta sẽ phải chơi đến khi đạt được một trạng thái kết thúc là chiến thắng hoặc đối phương đầu hàng.

##### Continuing

Task được gọi là **Continuing** (Liên tục) khi nó không có Terminal State và Agent sẽ phải thực hiện các Action liên tục cho đến khi ta chủ động dừng lại.

Ví dụ, học tập là một Continuing Task, vì lúc này sẽ không có một điểm dừng nào cả.

#### Triển khai Task cho game Pac-Man

Task trong game Pac-Man ta sẽ định nghĩa là đi đến thức ăn, tức là Terminal State của game là tại vị trí của thức ăn, và Pac-Man sẽ phải di chuyển đến khi vị trí này.

### Environment

#### Khái niệm Environment

**Environment** (Môi trường) đóng vai trò mô tả một thế giới và các quy tắc của thế giới đó. Environment có thể bất biến hoặc thay đổi theo thời gian.

Environment có thể là một ma trận đơn giản thể hiện các vị trí với thông tin của các vật thể tương ứng trên đó. Tuy nhiên Environment cũng hoàn toàn có thể là một mô phỏng 3D phức tạp.

#### Các loại Environment

Environment được chia làm 2 loại, **Static** (Tĩnh) và **Dynamic** (Động).

Ngoài ra, Environment cũng có thể được chia làm 2 loại khác là **Fully Observable** (Quan sát Toàn Phần) và **Partially Observable** (Quan sát Một Phần).

##### Static

Environment được gọi là **Static** (Tĩnh) khi nó không thay đổi theo thời gian.

Ví dụ, cờ vua sẽ có Environment là Static, vì bàn cờ có các ô vuông cố định và không thể thay đổi.

##### Dynamic

Environment được gọi là **Dynamic** (Động) khi nó thay đổi theo thời gian.

Ví dụ, xe tự lái sẽ có Environment là Dynamic, vì xe tự lái sẽ di chuyển và thay đổi vị trí theo thời gian. Buộc nó phải thích nghi với những Environment mà nó chưa từng gặp.

##### Fully Observable

Environment được gọi là **Fully Observable** (Quan sát Toàn Phần) khi Agent có thể quan sát và nắm được toàn bộ thông tin của Environment. Đây là loại đơn giản nhất và thuộc loại bài toán MDP.

Ví dụ, cờ vua sẽ có Environment là Fully Observable, vì Agent có thể quan sát được toàn bộ bàn cờ và biết các quân cờ đang nằm ở đâu.

##### Partially Observable

Environment được gọi là **Partially Observable** (Quan sát Một Phần) khi Agent không thể quan sát và nắm được toàn bộ thông tin của Environment mà sẽ bị giới hạn bởi **State** (Trạng thái) hiện tại của Agent. Đây là loại phức tạp hơn và thuộc loại bài toán **Q-Learning** (Học Q) và sẽ được giới thiệu trong các bài viết sau.

Ví dụ, xe tự lái sẽ có Environment là Partially Observable, vì Agent chỉ có thể quan sát được những gì xung quanh nó, nhưng không thể quan sát được những gì xa hơn.

#### Triển khai Environment cho game Pac-Man

Environment là một bản đồ gồm các ô vuông, tại các vị trí đó có thể là các vật thể như: **wall** (tường), **pit** (quái), **goal** (thức ăn) hoặc **empty** (không có gì):

$$
\begin{align}
O &= \{\text{empty}, \text{goal}, \text{pit}, \text{wall}\} \notag \\
&= \{0, 1, 2, 3\} \\
\end{align}
$$

Đây sẽ là một ma trận với mỗi phần tử là một giá trị bất kì thuộc tập $O$:

$$
\begin{align}
e_{i, j} &\in O \quad \forall i \in \{1, 2, ..., \text{rows}\}, j \in \{1, 2, ..., \text{cols}\} \notag \\
\mathbf{E} &= \begin{bmatrix}
e_{1, 1} & e_{1, 2} & \cdots & e_{1, \text{cols}} \\
e_{2, 1} & e_{2, 2} & \cdots & e_{2, \text{cols}} \\
\vdots & \vdots & \ddots & \vdots \\
e_{\text{rows}, 1} & e_{\text{rows}, 2} & \cdots & e_{\text{rows}, \text{cols}} \\
\end{bmatrix} \\
\end{align}
$$

### State

#### Khái niệm State

**State** (Trạng thái) không phải là trạng thái của Environment mà là thành phần mô tả một trạng thái có thể xảy ra của Pac-Man bên trong Environment đó. Vì thế, State chỉ có thể thay đổi khi Agent thực hiện một Action.

State thường được định nghĩa là vị trí của Agent trong Environment, nhưng nó cũng có thể là một trạng thái trừu tượng hơn như trạng thái của một đối tượng nào đó.

Để đơn giản, chúng ta sẽ mặc định các State là một tập số nguyên như bên dưới, mỗi State kí hiệu là $s \in \mathbb{N}$ với $n$ là số lượng State trong Environment:

$$
\begin{align}
s \in S &= \{s_1, s_2, s_3, ..., s_n\} \subset \mathbb{N} \\
\end{align}
$$

#### Các loại State

State được chia làm 2 loại, **Discrete** (Rời rạc) và **Continuous** (Liên tục).

##### Discrete

State được gọi là [Discrete](https://en.wikipedia.org/wiki/Discrete_group) (Rời rạc) khi các State là các số nguyên, tức là các State có thể đếm được.

Ví dụ, cờ vua sẽ có State là Discrete, vì các State là các vị trí trên bàn cờ, và các vị trí trên bàn cờ có thể đếm và xác định được.

##### Continuous

State được gọi là [Continuous](https://en.wikipedia.org/wiki/Continuous_function) (Liên tục) khi các State là các số thực, tức là các State có thể vô hạn và có thể là bất kì giá trị nào trong khoảng cho trước.

Ví dụ, xe tự lái sẽ có State là Continuous, vì các State là các vị trí trên đường đi, các vị trí này có thể chia nhỏ đến vô hạn và có thể là bất cứ đâu trên mỗi Environment mà nó tới.

#### Triển khai State cho game Pac-Man

State chính là các vị trí trên bản đồ, ngay cả các vị trí là tường hay quái cũng không ngoại lệ vì ta sẽ dùng nó để xem xét các quyết định có thể xảy ra của Pac-Man.

Số State sẽ bằng số dòng nhân với số cột của $\mathbf{E}$, do đó ta sẽ đánh số các State từ $0$ đến $n - 1$ tương ứng với các vị trí trên ma trận $\mathbf{E}$ từ trái sang phải, từ trên xuống dưới:

$$
\begin{align}
n &= \text{rows} \times \text{cols} \\
S &= \{0, 1, 2, ..., n - 1\} \notag \\
\end{align}
$$

Lúc này, ta sẽ phải định nghĩa một mapping function $\mathcal{S}$ cho phép truy xuất tới State từ một vị trí bất kì trên bản đồ và ngược lại:

$$
\begin{align}
\mathcal{S} : \mathbb{N} \times \mathbb{N} &\rightarrow \mathbb{N} \notag \\
\mathcal{S}(i, j) &= s \notag \\
\mathcal{S}^{-1}(s) &= (i, j) \\
\end{align}
$$

Thuật toán của chúng đơn giản như sau:

$$
\begin{align}
\mathcal{S}(i, j) &= i \times \text{cols} + j \notag \\
\mathcal{S}^{-1}(s) &= \left( \left\lfloor \frac{s}{\text{cols}} \right\rfloor, s \bmod{\text{cols}} \right)
\end{align}
$$

### Action

#### Khái niệm Action

**Action** (Hành động) là những hành động mà Agent có thể thực hiện bên trong Environment nhằm thay đổi State để đạt được mục đính. Không phải Action cũng sẽ thực hiện được mà còn vào từng State. Và cũng không phải lúc nào Action cũng sẽ thay đổi State của Agent.

Action có thể đơn giản là tập hợp các hướng di chuyển, nhưng cũng có thể là các hành động phức tạp như thay đổi các khớp xương, trò chuyện, hay tương tác với các đối tượng khác,...

Ta cho một Action là $a \in \mathbb{N}$, với $m$ là số lượng Action có thể thực hiện:

$$
\begin{align}
a \in A &= \{a_1, a_2, a_3, ..., a_m\} \subset \mathbb{N} \\
\end{align}
$$

Với tính chất trên, ta sẽ định nghĩa một **Mapping Function** (Ánh xạ) $\mathcal{A}$ cho phép truy xuất tới State tiếp theo dựa trên State hiện tại và Action cho trước:

$$
\begin{align}
\mathcal{A} : S \times A &\mapsto S \notag \\
\mathcal{A}(s, a) &= s' \\
\end{align}
$$

#### Các loại Action

Action được chia làm 2 loại, **Deterministic** (Xác định) và **Stochastic** (Ngẫu nhiên).

Ngoài ra, giống với State, Action cũng được chia làm 2 loại khác là Discrete và Continuous (sẽ không cần phải nhắc lại phần này).

##### Deterministic

Action được gọi là **Deterministic** (Xác định) khi Agent thực hiện một Action nào đó thì sẽ luôn đến một State tương ứng. Tuy nhiên nó sẽ có một vài nhược điểm như hiện tượng [Overfitting](https://en.wikipedia.org/wiki/Overfitting) (Quá khớp), không thể khám phá được các State mới, hoặc có thể bị mắc kẹt.

Ví dụ khi ta thực hiện một hành động đi đến một căn phòng nào đó trong ngôi nhà hiện tại, ta sẽ luôn đến được căn phòng đó, đây được gọi là Deterministic vì tỉ lệ đến được căn phòng đó là $100\%$.

##### Stochastic

Action được gọi là **Stochastic** (Ngẫu nhiên) khi Agent thực hiện một Action nào đó thì có thể đến một State khác nằm ngoài dự tính miễn là nó có thể đến được.

Một ví dụ là khi đi du lịch, với mong muốn đến một thành phố đã cho trước, ta có thể đến được thành phố đó, nhưng cũng có một tỉ lệ nhỏ là ta sẽ bị lạc đến thành phố khác hay bị mắc kẹt ở nơi hiện tại.

#### Triển khai Action cho game Pac-Man

Có $4$ Action có thể thực hiện tại mỗi State:

$$
\begin{align}
m &= 4 \\
\end{align}
$$

Và các Action có thể xảy ra là di chuyển sang: **left** (trái), **right** (phải), **up** (lên trên), **down** (xuống dưới):

$$
\begin{align}
A &= \{\text{left}, \text{up}, \text{right}, \text{down}\} \notag \\
&= \{0, 1, 2, 3\} \\
\end{align}
$$

Lí do được sắp xếp như vậy là để ta có thể dễ dàng triển khai mapping function $\mathcal{N}$ cho phép truy xuất tới 2 hướng bên cạnh hướng đã cho:

$$
\begin{align}
\mathcal{N} : A &\rightarrow A \times A \notag \\
\mathcal{N}(a) &= (a', a'') \\
\end{align}
$$

Thuật toán tương đối đơn giản:

$$
\begin{align}
\mathcal{N}(a) = a \pm 1 \bmod{m} \\
\end{align}
$$

Giả sử Pac-Man đang có State là $s = 1$, sau khi đi sang phải, ta có thể biết được State mới của Pac-Man là:

$$
\begin{align*}
s' = \mathcal{A}(1, 2) = 2
\end{align*}
$$

Ta cũng sẽ định nghĩa rằng nếu Pac-Man đang ở biên mà thực hiện Action đi ra ngoài thì sẽ bị dội ngược lại vào trong (giữ nguyên vị trí).

Đây là lúc Stochastic phát huy tác dụng vì nếu chẳng may Policy tại đó là một Action đi ra ngoài, Pac-Man sẽ có thể trốn thoát khỏi đó sau vài lần lặp nhờ vào một **Random Rate** (Mức độ Ngãu nhiên) nhỏ, còn không Pac-Man sẽ mãi mãi đứng yên.

### Policy

#### Khái niệm Policy

**Policy** (Kế hoạch) thể hiện một Action mà Agent nên thực hiện khi ở một State nào đó. Với một Random Rate khác $0$, Action của Agent là Stochastic, ngược lại là Deterministic.

Policy là một mapping function $\mathcal{\pi}$ cho biết tại một State nhất định, Action nào nên được thực hiện:

$$
\begin{align}
\mathcal{\pi} : S &\mapsto A \notag \\
\mathcal{\pi}(s) &= a \\
\end{align}
$$

Policy sẽ được khởi tạo một cách ngẫu nhiên, có nghĩa là ban đầu Pac-Man sẽ đi một cách lung tung ở những lần đầu tiên, dần dần chúng ta sẽ tối ưu nó bằng các thuật toán.

#### Triển khai Policy cho game Pac-Man

Policy cũng là một bản đồ mà thay vì chứa các Object, các vị trí trên đó sẽ là Action mong muốn. Chỉ cần đi theo các Action đã định sẵn trên mỗi State, dù được đặt ở vị trí nào đi chăng nữa, Pac-Man vẫn sẽ luôn tìm được đường đi ngắn nhất đến thức ăn.

### Random Rate

#### Khái niệm Random Rate

**Random Rate** (Mức độ Ngẫu nhiên) là một giá trị thể hiện xác suất mà Agent sẽ thực hiện một Action nằm ngoài Policy.

Đối với loại Action là Deterministic, sẽ không có gì để nói vì Agent sẽ luôn đến một State hợp lệ đã cho, do đó Random Rate sẽ bằng $0$. Còn với loại Action là Stochastic, Random Rate sẽ là một giá trị nằm trong khoảng $[0, 1]$.

#### Triển khai Random Rate cho game Pac-Man

Trong ví dụ sắp tới, chúng ta sẽ cho Random Rate là $0.2$ theo quy tắc như sau:

- $80\%$ Pac-Man sẽ đi theo hướng như Policy đã chỉ định
- $20\%$ Pac-Man sẽ đi theo 2 hướng bên cạnh Policy.

### Reward

#### Khái niệm Reward

Là cốt lõi của bài toán Reinforcement Learning, **Reward** (Phần thưởng) là một giá trị mà Agent nhận được sau khi thực hiện một Action. Tuỳ thuộc vào mỗi State mà Reward sẽ khác nhau.

Các Reward sẽ được định nghĩa từ trước, và đây là giá trị mà Agent phải dựa vào để đưa ra quyết định.

Reward, kí hiệu là $r \in \mathbb{R}$, với $k$ là số lượng Reward có thể nhận được:

$$
\begin{align}
r \in R &= \{r_1, r_2, r_3, ..., r_k\} \subset \mathbb{R} \\
\end{align}
$$

Vì mỗi State tương ứng với một Reward, ta có thể truy xuất một Reward từ một State bằng mapping function $\mathcal{R}$:

$$
\begin{align}
\mathcal{R} : S &\mapsto R \notag \\
\mathcal{R}(s) &= r \\
\end{align}
$$

#### Triển khai Reward cho game Pac-Man

Chúng ta sẽ định nghĩa các các ô thức ăn có reward là $+10$, các ô quái có reward là $-10$ và các ô trống có reward là $-0.1$ (để Pac-Man tìm đường đi ngắn nhất, tránh lặp lại các hành động vô nghĩa).

$$
\begin{align}
\mathcal{R}(s) &= \begin{cases}
+10 & \text{if} \enspace \mathbf{E}[\mathcal{S}^{-1}(s)] = \text{goal} \\
-10 & \text{if} \enspace \mathbf{E}[\mathcal{S}^{-1}(s)] = \text{pit} \\
-0.1 & \text{if} \enspace \mathbf{E}[\mathcal{S}^{-1}(s)] = \text{empty} \\
\text{NaN} & \text{otherwise} \\
\end{cases} \\
\end{align}
$$

### Cumulative Reward

#### Khái niệm Cumulative Reward

**Cumulative Reward** (Phần thưởng Tích luỹ) là giá trị thể hiện số Reward đã tích luỹ được trong lời giải của mình. Giá trị này sẽ ảnh hưởng đến việc đánh giá một Policy là tốt hay xấu, do đó, nhiệm vụ của Agent là tìm ra lời giải sao cho giá trị này là lớn nhất.

Cucumlative Reward có thể đơn giản là tổng của các Reward, nhưng cũng có thể là một công thức phức tạp (sẽ được giới thiệu ở bài viết sau).

Gọi $R^+$ là tập hợp các Reward đã nhận được trong một Episode với $p$ Action đã thực hiện:

$$
\begin{align}
R^+ &= [r_1, r_2, r_3, ..., r_p] \\
\end{align}
$$

Khi đó, mapping function $\mathcal{C}$ sẽ nhận một tập hợp gồm $p$ phần tử Reward và trả về một Cucumlative Reward $c$ nhằm phản ánh mức độ tối ưu của lời giải hiện tại:

$$
\begin{align}
\mathcal{C} : R^{p} &\mapsto \mathbb{R} \notag \\
\mathcal{C}(R^+) &= c \\
\end{align}
$$

#### Triển khai Cucumlative Reward cho game Pac-Man

Ta sẽ định nghĩa Cucumlative Reward là tổng của các Reward đã nhận được trên đường đi:

$$
\begin{align}
\mathcal{C}(r = R^+) &= \sum_{t = 0}^{p-1} r_t \notag \\
&= r_0 + r_1 + r_2 + \ldots + r_{p - 1} \\
\end{align}
$$

### Transition Model

#### Khái niệm Transition Model

**Transition Model** (Mô hình Chuyển tiếp) mô tả xác suất mà một State sẽ chuyển sang State khác sau khi Agent thực hiện một Action.

Đối với loại State là Discrete, Model này sẽ được triển khai theo một [Look-up Table](https://en.wikipedia.org/wiki/Lookup_table) (Bảng Tra cứu). Còn với loại State là Continuous, Model này sẽ được triển khai theo một [Probability Density Function](https://en.wikipedia.org/wiki/Probability_density_function) (Hàm Mật độ Xác suất).

Gọi xác suất này là $p \in [0, 1]$ tuân theo một [Probability Distribution](https://en.wikipedia.org/wiki/Probability_distribution) (Phân phối Xác suất) $\mathcal{P}$ thể hiện xác suất có thể chuyển đến một State nào đó trong Environment.

$$
\begin{align}
\mathcal{P} : S &\mapsto [0, 1] \notag \\
\mathcal{P}(s) &= p \\
\end{align}
$$

Khi đó với mỗi cặp State và Action cho trước, ta có thể truy xuất được một hàm phân phối xác suất $\mathcal{P}$ tương ứng. Đặt mapping function này là $\mathcal{T}$:

$$
\begin{align}
\mathcal{T} : S \times A &\mapsto \mathcal{P}^{m \times n} \notag \\
\mathcal{T}(s, a) &= \mathcal{P} \\
\mathcal{T}(s' | s, a) &= p \\
\end{align}
$$

#### Triển khai Transition Model cho game Pac-Man

Cho trước một vị trí và hướng đi mong muốn, ta có thể biết được xác suất các vị trí tiếp theo mà Pac-Man sẽ đến. Tất nhiên vị trí của hướng đi mong muốn sẽ chiếm phần lớn xác suất, còn lại một phần nhỏ sẽ rơi vào các vị trí bên cạnh (tuỳ theo quy tắc đã đặt ra) và cuối cùng, các vị trí là tường, quái hay các vị trí không liền kề Pac-Man sẽ có xác suất là $0$.

$$
\begin{align}
\mathcal{T}(s' | s, a) &= \begin{cases}
0.8 & \text{if} \enspace s' = \mathcal{A}(s, a) \\
0.2 & \text{if} \enspace s' = \mathcal{A}(s, \mathcal{N}(a)) \\
0 & \text{otherwise} \\
\end{cases} \\
\end{align}
$$

Transition Model sẽ là một 3D array trông như sau:

$$
\begin{align}
\mathcal{T}(s' = 0 | s = 2, a = 1) &= 0 \notag \\
\mathcal{T}(s' = 1 | s = 2, a = 1) &= 0.1 \notag \\
\mathcal{T}(s' = 2 | s = 2, a = 1) &= 0.8 \notag \\
\mathcal{T}(s' = 3 | s = 2, a = 1) &= 0.1 \notag \\
\mathcal{T}(s' = 4 | s = 2, a = 1) &= 0 \notag \\
\ldots \notag
\end{align}
$$

Hay nếu truy xuất thông qua $s$ và $a$:

$$
\mathcal{T}(s = 2, a = 1) = [0, 0.1, 0.8, 0.1, 0, \ldots]
$$

Qua đó ta có thể thấy $\mathcal{T}(s, a) = \mathcal{P}$ là một **Discrete Probability Distribution** (Phân phối Xác suất Rời rạc), đảm bảo:

$$
\sum_{s' \in S} \mathcal{P(s')} = 1
$$

Còn nếu truy xuất chỉ thông qua $s$, ta sẽ có một ma trận với cột là các State có thể xảy ra và hàng là các Action tương ứng:

$$
\begin{align}
\mathcal{T}(s = 2) &= \begin{bmatrix}
0 & 0.9 & 0 & 0 & 0.1 & \ldots \\
0 & 0.1 & 0.8 & 0.1 & 0 & \ldots \\
0 & 0 & 0 & 0.9 & 0 & \ldots \\
0 & 0.1 & 0 & 0.1 & 0 & \ldots \\
\end{bmatrix} \\
\end{align}
$$

Còn đối với việc truy xuất thông qua $a$, mỗi Action sẽ tương ứng với một [Transition Matrix](https://en.wikipedia.org/wiki/Stochastic_matrix) (Ma trận Chuyển tiếp) như trong [Markov Chain](https://snowyfield.software/posts/gioi-thieu-ve-markov-chain-va-ung-dung), thể hiện quá trình chuyển đổi qua lại giữa các State.

## Xây dựng MDP

Chúng ta đã nắm được các khái niệm cơ bản, bây giờ quay lại bài toán Pac-Man với những giá trị từ các ví dụ đã cho ở phần trước, một bản đồ game $4 \times 4$ sẽ trông như sau:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-1.png"
    alt="Ví dụ Environment trong game Pac-Man"
/>
</figure>

Rõ ràng nhiệm vụ của chúng ta là tạo ra một Policy hợp lí. Nhưng làm thế nào để tạo Policy? Trước tiên hãy random một vài cái và nhận xét.

### Policy 1

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-policy-1.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Giả sử Pac-Man bắt đầu ở vị trí $(0, 2)$, nó sẽ đi sang phải $(0, 3)$, sau đó bị mắc kẹt vì không thể đi lên trên được nữa. Với lượng Random Rate $20\%$ đã cho (thực tế chỉ còn $10\%$ vì sẽ bị dội ngược lại nếu di chuyển sang phải), có thể Pac-Man sẽ quay về bên trái nhưng sau đó lại có tới $80\%$ đi tiếp sang phải. Rõ ràng Policy này không ổn chút nào.

Chúng ta có thể kiểm chứng bằng cách thả Pac-Man vào vị trí $(0, 0)$ và cho nó di chuyển dưới dự ảnh hưởng của Policy này $100$ lần. Đối với những lần Pac-Man đến ô thức ăn màu xanh, ta sẽ kiểm tra Cucumlative Reward nhận được trong quá trình di chuyển:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-frequency-1.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Có thể thấy vì là ngẫu nhiên nên biểu đồ của chúng ta không phân bố đều. Đặc biệt là Cucumlative Reward lớn nhất chỉ có $-10$, trong số đó cũng xảy ra một vài trường hợp chỉ còn $-14$ sau khi đến được ô màu xanh. Chứng tỏ Pac-Man đã đi lòng vòng khá nhiều trước khi có thể đến được đích.

### Policy 2

Hãy thử tạo ngẫu nhiên một Policy khác:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-policy-2.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Thoạt nhìn Policy này trông có vẻ ổn hơn, có một số vị trí không cần phải dựa vào Random Rate vẫn dến được đích như vị trí $(0, 2)$. Bây giờ hãy kiểm tra Cucumlative Reward thu được khi bắt đầu tại vị trí $(0, 0)$:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-frequency-2.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Kết quả khá ấn tượng khi Cucumlative Reward cao nhất lên đến xấp xỉ $+10$, đây cũng là điểm số tối ưu nhất vì chỉ có Reward của đích đến là dương và là $+10$, chứng tỏ nó đã tốn rất ít bước di chuyển.

Tuy nhiên đây chỉ là do chúng ta mặc định bắt đầu tại $(0, 0)$, hãy thử một vị trí khác là $(2, 0)$:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-frequency-2-2.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Kết quả này thậm chí còn tệ hơn cả Policy 1, vậy là Policy 2 cũng không phải là một Policy tối ưu.

### Policy 3

Lần này chúng ta sẽ không tạo Policy một cách ngẫu nhiên nữa mà sẽ can thiệp vào quá trình này:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-policy-3.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Đây là một Policy "nhân tạo" đã được can thiệp, trông có vẻ rất hợp lí vì bất kì vị trí nào cũng đều dẫn đến ô màu xanh một cách ngắn nhất. Hãy kiểm tra Cucumlative Reward thu được khi bắt đầu tại vị trí $(0, 0)$:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/mdp-world-frequency-3.png"
    alt="Ví dụ Policy trong game Pac-Man"
/>
</figure>

Một kết quả xuất sắc, Cucumlative Reward cao nhất là $9.4$, có nghĩa là nó chỉ mất $0.6$ điểm, tương đương với $6$ bước di chuyển để đi đến đích. Với các lần thử khác, Random Rate đã khiến nó mất thêm một ít điểm nhưng không vấn đề gì. Chúng ta không cần phải kiểm tra các vị trí khác vì kết quả cũng sẽ tương tự.

### Kết luận

Số Policy khả thi trong một Environment có $16$ State với $4$ Action như trên là $4^{16}$, có nghĩa là để tạo ngẫu nhiên ra được Policy 3, tỉ lệ sẽ là:

$$
\frac{1}{4^{16}} \approx 2.33 \times 10^{-10}
$$

Tỉ lệ này tương đương với việc chọn trúng Hệ Mặt Trời của chúng ta trong giữa Dải Ngân Hà rộng lớn với hơn $100$ tỷ Ngôi Sao. Chắc chắn việc tạo ngẫu nhiên Policy là một ý tưởng tồi.

Do đó ta có 2 thuật toán chính để giúp chúng ta làm điều này, đó là **Policy Iteration** (Lặp theo Policy) và **Value Iteration** (Lặp theo Value).

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/reinforcement_learning](https://github.com/SnowyField1906/ai-general-research/reinforcement_learning).

### Thuật toán chính

Xem tại [World.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/World.py).

#### Khởi tạo

```python
def __init__(self, filename, reward=default_reward, random_rate=default_random_rate):
    file = open(filename)
    self.map = np.array(
        [list(map(float, s.strip().split(","))) for s in file.readlines()]
    )
    file.close()
    self.n_rows = self.map.shape[0]
    self.n_cols = self.map.shape[1]
    self.n_states = self.n_rows * self.n_cols
    self.reward = reward
    self.random_rate = random_rate
    self.reward_function = self.get_reward_function()
    self.transition_model = self.get_transition_model()
```

#### Các mapping function

- Mapping function $\mathcal{S}$ và $\mathcal{S}^{-1}$:

```python
def get_state_from_pos(self, pos):
    return pos[0] * self.n_cols + pos[1]

def get_pos_from_state(self, state):
    return state // self.n_cols, state % self.n_cols
```

- Mapping function $\mathcal{A}$ và $\mathcal{N}$:

```python
def get_next_pos(self, pos, action):
    if action == A.LEFT:
        return pos[0], max(pos[1] - 1, 0)
    elif action == A.RIGHT:
        return pos[0], min(pos[1] + 1, self.n_cols - 1)
    elif action == A.UP:
        return max(pos[0] - 1, 0), pos[1]
    elif action == A.DOWN:
        return min(pos[0] + 1, self.n_rows - 1), pos[1]

def get_likely_action(self, action):
    return [action, (action + 1) % A.LEN, (action - 1) % A.LEN]
```

- Mapping function $\mathcal{R}$ và $\mathcal{T}$ (trả về toàn bộ thay vì mapping):

```python
def get_reward_function(self):
    reward_table = np.zeros(self.n_states)

    for r in range(self.n_rows):
        for c in range(self.n_cols):
            curr_pos = (r, c)
            s = self.get_state_from_pos(curr_pos)
            reward_table[s] = self.reward[self.map[curr_pos]]

    return reward_table

def get_transition_model(self):
    transition_model = np.zeros((self.n_states, A.LEN, self.n_states))

    for r in range(self.n_rows):
        for c in range(self.n_cols):
            curr_pos = (r, c)
            s = self.get_state_from_pos(curr_pos)
            neighbor_s = np.zeros(A.LEN)

            if self.map[curr_pos] == 0:
                for a in A.ACTIONS:
                    next_pos = self.get_next_pos(curr_pos, a)
                    neighbor_s[a] = self.get_state_from_pos(next_pos)
            else:
                neighbor_s = np.ones(A.LEN) * s

            for a in A.ACTIONS:
                main, likely1, likely2 = self.get_likely_action(a)
                transition_model[s, a, int(neighbor_s[main])] += 1 - self.random_rate
                transition_model[s, a, int(neighbor_s[likely1])] += self.random_rate / 2.0
                transition_model[s, a, int(neighbor_s[likely2])] += self.random_rate / 2.0

    return transition_model
```

- Mapping function $\mathcal{C}$:

```python
def execute_policy(self, policy, start_pos, time_limit=default_time_limit):
    s = self.get_state_from_pos(start_pos)
    r = self.reward_function[s]
    total_reward = r

    start_time = int(round(time() * 1000))
    overtime = False

    while r != self.reward[1] and r != self.reward[2]:
        s = np.random.choice(self.n_states, p=self.transition_model[s, policy[s]])
        r = self.reward_function[s]
        total_reward += r
        cur_time = int(round(time() * 1000)) - start_time
        if cur_time > time_limit:
            overtime = True
            break
    if overtime is True:
        return float('-inf')
    else:
        return total_reward
```

### Các hàm phụ trợ

Xem tại [Visualizer.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/Visualizer.py).

### Kiểm thử

Xem tại [test-World.py](https://github.com/SnowyField1906/ai-general-research/blob/main/reinforcement_learning/test-World.py).
