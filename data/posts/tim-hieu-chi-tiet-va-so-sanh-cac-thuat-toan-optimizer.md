---
title: Tìm hiểu chi tiết và so sánh các thuật toán optimizer
date: '2023-10-28'
tags: ['Supervised Learning', 'Machine Learning', 'Optimization', 'Calculus', 'Mathematics']
draft: false
summary: Giới thiệu chi tiết về các thuật toán optimizer và so sánh hiệu quả của chúng, khi nào nên sử dụng thuật toán nào.
layout: PostView
thumbnail: '/static/images/thumbnails/tim-hieu-chi-tiet-va-so-sanh-cac-thuat-toan-optimizer.png'
---

_Các thuật toán Optimizer (Tối ưu) là một phần quan trọng lĩnh vực Machine Learning. Chúng giúp cho việc tìm kiếm cực trị của Loss Function (Hàm Mất mát) nhanh và hiệu quả hơn. Điều này sẽ giúp tăng tốc quá trình train model nhưng vẫn đảm bảo độ chính xác cao._

_Để hiểu rõ hơn về các thuật toán optimizer, chúng ta sẽ cùng tìm hiểu về các thuật toán optimizer thông dụng nhất và so sánh hiệu quả của chúng trong bài viết này. Bao gồm: Gradient Descent, SGD, Momentum, NAG, Adagrad, RMSProp/Adadelta và Adam._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/tim-hieu-chi-tiet-va-so-sanh-cac-thuat-toan-optimizer.png" alt="Tìm hiểu chi tiết và so sánh các thuật toán optimizer" />

> Khuyến nghị đọc trước [Toàn tập về bài toán Least Squares và các phương pháp giải](https://snowyfield.software/posts/toan-tap-ve-bai-toan-least-squares-va-cac-phuong-phap-giai) để sẵn sàng trước khi đi vào bài viết này.

## Khái niệm

Thuật toán **Optimizer** (Tối ưu) về cơ bản là một thuật toán dùng để tìm ra các giá trị tối ưu nhất bằng cách giải bài toán tìm cực tiểu cho **Loss Function** (Hàm Mất mát) của model. Có thể hiểu nôm na rằng loss function thể hiện mức độ sai lệch giữa giá trị dự đoán và giá trị thực tế, do đó để có một model tối ưu, chúng ta cần tìm ra các giá trị sao cho loss function đạt giá trị nhỏ nhất có thể.

Thông thường việc giải bài toán tìm kiếm cực trị của một hàm số là một bài toán rất khó, vì vậy các thuật toán optimizer thường sẽ có một thuật toán chung là thực hiện các vòng lặp cho đến khi tìm ra được bộ giá trị thỏa mãn.

### Nhắc lại

#### Loss Function

**Loss Function** (Hàm Mất mát) hay còn gọi là **Error Function** (Hàm Lỗi) là một hàm số dùng để đánh giá mức độ sai lệch giữa giá trị dự đoán và giá trị thực tế. Các giá trị cần optimize thường là các **Weight/Parameter** (Tham số) của model.

Có rất nhiều loại loss fuction với từng bài toán khác nhau như **Regression** (Hồi quy), **Classification** (Phân loại), **Clustering** (Phân cụm),... Tuy nhiên, hầu hết chúng sẽ có cùng một cách tính là lấy tổng của các giá trị sai lệch $\text{error}$ trên toàn bộ tập dữ liệu. Trong đó, với mỗi điểm dữ liệu $j$, $\text{error}_j$ thường sẽ được tính dựa trên giá trị dự đoán $\hat{y}_j$ và giá trị thực tế $y_j$:

#### Learning Rate

**Learning Rate** (Tốc độ Học) là một hệ số được sử dụng trong các thuật toán optimizer, nó thể hiện mức độ ảnh hưởng của từng parameter đến giá trị loss function. Learning rate càng lớn thì mức độ ảnh hưởng càng lớn, và ngược lại.

Tùy theo mục đích của model mà ta có thể tăng/giảm learning rate. Learning rate càng cao sẽ giúp model học nhanh hơn và tiết kiệm thời gian, nhưng cũng sẽ gây ra sự thay đổi giữa các parameter càng lớn, dẫn đến việc training không ổn định, dao động mạnh và có thể không hội tụ được.

## Chi tiết về Gradient Descent

Cho loss function $L$ với các tham số:

$$
\begin{aligned}
w = \{w_1, w_2, ..., w_m\}
\end{aligned} \tag{1}
$$

Để tiện trong việc giải thích, ta sẽ giả sử $L = \frac{1}{2n} \sum (\hat{y} - y)^2$ với $n$ là số lượng điểm dữ liệu.

Ta có thể tính được gradient của $L$ theo $w$. Đây chính là một vector đạo hàm riêng của $L$ theo $w$, vector này thể hiện hướng tăng nhanh nhất của $L$ tại $w$:

$$
\begin{aligned}
\nabla L(w) = \left(\frac{\partial L}{\partial w_1}, \frac{\partial L}{\partial w_2}, ..., \frac{\partial L}{\partial w_m}\right)
\end{aligned} \tag{2}
$$

Cho $\eta$ là learning rate, con số này này thể hiện mức độ ảnh hưởng của từng parameter đến giá trị $L$. Do đó ta sẽ dùng nó để tích với vector $\nabla L(w)$ để có được vector với độ dài gấp $\eta$ lần so với ban đầu, giúp cho việc di chuyển nhanh hơn:

$$
\begin{aligned}
\Delta w = \eta \nabla L(w)
\end{aligned} \tag{3}
$$

Khi đó, để tìm được điểm cực trị của $L$, ta chỉ cần đi theo hướng ngược lại của $\nabla L(w)$ với hệ số $\eta$ cho đến khi đạt được điều kiện dừng. Bằng cách lấy điểm $w$ hiện tại trừ đi độ biến thiên $\Delta w$, ta sẽ có được điểm mới $w'$:

$$
\begin{aligned}
w' &= w - \Delta w \\
&= w - \eta \nabla L(w)
\end{aligned} \tag{4}
$$

Lặp lại quá trình trên cho đến khi đạt được điều kiện dừng, ta sẽ có được giá trị $w$ tối ưu.

### Thuật toán Gradient Descent

**Các bước thực hiện:**

1. Tìm $L = \frac{1}{2n} \sum (\hat{y} - y)^2$
2. Tính gradient của $L$ tại $w$: $\nabla L(w)$.
3. Tìm $\Delta w$: $\Delta w = \eta \nabla L(w)$.
4. Cập nhật lại các parameter $w$: $w' = w - \Delta w$.
5. Lặp từ các bước 2-4 trên cho đến khi đạt được điều kiện dừng.

**Công thức tổng quát:**

$$
\begin{aligned}
w_t &= w_{t-1} - \eta \nabla L(w_t) \\
\end{aligned} \tag{5}
$$

### Kết luận về Gradient Descent

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/gd-example-plot.png"
    alt="Mô phỏng quá trình Gradient Descent"
/>
<figcaption>Source: researchgate.com by Alexander Amini</figcaption>
</figure>

Ta có thể thấy đường đi của **Gradient Descent** trông như một quả bóng lăn xuống sườn núi. Điều này cũng chính là ý nghĩa của gradient trong lĩnh vực **Vector Calculus** (Giải tích Vector).

### Ưu điểm của Gradient Descent

- Đơn giản và dễ hiểu.
- Dễ cài đặt.

### Nhược điểm của Gradient Descent

- Phụ thuộc vào learning rate $\eta$.
- Phụ thuộc vào parameter số $w$ khởi tạo ban đầu.
- Thường rơi vào các **local minima** (cực tiểu địa phương) thay vì **global minima** (cực tiểu toàn cục).
- Không thể thoát ra khỏi **saddle point** (điểm yên ngựa).
- Chậm khi số lượng data training vào lớn.

## Các thuật toán optimizer

### SGD

Trong **Gradient Descent**, parameter số $w$ sẽ được cập nhật toàn bộ sau mỗi lần tính toán gradient. Điều này sẽ khiến cho việc tính toán trở nên rất chậm, đặc biệt là khi số parameter số $w$ rất lớn.

Trong khi đó, mấu chốt của thuật toán này là tìm ra được hướng tăng nhanh nhất của $L$ tại $w$, do đó ta không cần hướng này phải chính xác hoàn toàn mà có thể lấy xấp xỉ để giảm thiểu thời gian tính toán.

Như đã biết, $L$ là tổng của các giá trị sai lệch $\text{error}$ trên toàn bộ tập dữ liệu, với mỗi $\text{error}$ là sai lệch của 1 điểm dữ liệu. Do đó, để tính gradient của $L$, ta phải đạo hàm tổng của các $\text{error}$ theo từng parameter $w$. Tuy nhiên, ta có thể xấp xỉ gradient bằng cách chỉ tính trên 1 $\text{error}$ của 1 điểm dữ liệu ngẫu nhiên.

Và đây chính là cách hoạt động của biến thể **Stochastic Gradient Descent** (SGD). Điều này tuy sẽ tăng số lần cập parameter số $w$ (số vòng lặp) lên rất nhiều, nhưng mỗi lần lặp cũng sẽ nhanh hơn rất nhiều so với **Gradient Descent**.

#### Thuật toán SGD

**Các bước thực hiện:**

1. Tìm $L$ dựa trên một điểm dữ liệu ngẫu nhiên $j$ đã chọn: $L = \frac{1}{2} (\hat{y}_j - y_j)^2$
2. Tính gradient của $L$ tại $w$: $\nabla L(w)$
3. Tìm $\Delta w$: $\Delta w = \eta \nabla L(w)$.
4. Cập nhật lại các parameter $w$: $w' = w - \Delta w$.
5. Lặp lại các bước 1-4 trên cho đến khi đạt được điều kiện dừng.

**Công thức tổng quát:**

$$
\begin{aligned}
w_t &= w_{t-1} - \eta \nabla L(w_t) \\
\end{aligned} \tag{6}
$$

#### Kết luận về SGD

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/gd-vs-sgd-example-plot.png"
    alt="Mô phỏng quá trình SGD so với Gradient Descent"
/>
<figcaption>Source: machinelearningcoban.com</figcaption>
</figure>

Ta có thể thấy đường đi của **SGD** là đường zigzag. Lí do là vì mỗi lần lặp, nó chỉ tính gradient dựa trên một điểm dữ liệu ngẫu nhiên, mà điểm này không thể đại diện cho toàn bộ tập dữ liệu. Do đó, nó sẽ cho ra một hướng đi không chính xác, và cần nhiều lần lặp hơn để đạt được điều kiện dừng.

Ví dụ, ta có một lớp học với 100 học sinh, thay vì tính điểm trung bình bằng cách lấy toàn bộ điểm của 100 học sinh, ta chỉ lấy 1 học sinh ngẫu nhiên và dùng nó để đại diện cho toàn bộ lớp học. Ban đầu, số điểm này có thể là $5$, nhưng sau đó sẽ tăng lên hoặc giảm đi tùy vào điểm của học sinh được chọn tiếp theo. Việc tăng giảm liên tục này gây ra sự dao động của điểm số, khiến nó đi theo đường zigzag.

#### Ưu điểm của SGD

- Nhanh hơn so với Gradient Descent.

#### Nhược điểm của SGD

- Phụ thuộc vào learning rate $\eta$.
- Phụ thuộc vào parameter số $w$ khởi tạo ban đầu.
- Thường rơi vào các local minima thay vì global minima.
- Không thể thoát ra khỏi saddle point.

### Mini-Batch GD

Là một thuật toán hoàn toàn giống với **SGD**, chỉ khác là thay vì tính trên $1$ điểm dữ liệu duy nhất, ta sẽ tính trên $n$ điểm dữ liệu ngẫu nhiên (lớn hơn $1$ nhưng vẫn nhỏ hơn tổng số điểm dữ liệu rất nhiều).

Chúng ta sẽ không cần phải đi vào chi tiết thuật toán này.

### Momentum

**Momentum** (Quán tính) hay **Stochastic Gradient Descent with Momentum** là một biến thể của **SGD**, phương pháp này sinh ra nhằm giải quyết vấn đề dao động mạnh trong quá trình tìm kiếm cực trị của **SGD**. Phương pháp này cũng giải quyết được việc không thể thoát ra khỏi local minima hay saddle point.

Ý tưởng của phương pháp này là giả lập một lực quán tính, làm giảm tốc độ khi đổi hướng theo một hệ số $\alpha$. Điều này giúp cho việc di chuyển nhanh hơn và giảm thiểu sự dao động của đường đi. Do đó các đường zigzag sẽ hẹp hơn và tiến về phía cực trị nhanh hơn, ngoài ra lực quán tính này cũng có khả năng vượt qua được các local minima hay thoát ra khỏi saddle point.

Thuật toán này được triển khai bằng cách thay vì trừ trực tiếp gradient hiện tại vào $w$, ta sẽ trừ với tổng của 2 vector là vector trước đó và gradient hiện tại:

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/momentum-vector.png"
    alt="Mô phỏng quá trình Momentum so với SGD"
/>
<figcaption>Source: cs231n.github.io</figcaption>
</figure>

Qua hình ảnh ta có thể hình dung được hướng đi của **Momentum** là tổng của 2 vector: hướng đi trước đó và gradient hiện tại.

Lúc này, vector mới vừa có thông tin của gradient hiện tại vừa giữ lại được một phần của vector trước đó tùy thuộc vào hệ số $\alpha$.

$$
\begin{aligned}
v' &= \alpha v + \Delta w \\
&= \alpha v + \eta \nabla L(\hat{w}) \\
\end{aligned} \tag{7}
$$

#### Thuật toán Momentum

**Các bước thực hiện:**

1. Tìm $L$ dựa trên một điểm dữ liệu ngẫu nhiên $j$ đã chọn: $L = \frac{1}{2} (\hat{y}_j - y_j)^2$
2. Tính gradient của $L$ tại $w$: $\nabla L(w)$
3. Tìm $\Delta w$: $\Delta w = \eta \nabla L(w)$.
4. Cập nhật lại vận tốc $v$: $v' = \alpha v + \Delta w$
5. Cập nhật lại các parameter $w$: $w' = w - v'$.
6. Lặp lại các bước 1-5 trên cho đến khi đạt được điều kiện dừng.

**Công thức tổng quát:**

$$
\begin{aligned}
w_t &= w_{t-1} - \alpha v_t - \eta \nabla L(w_{t-1}) \\
\end{aligned} \tag{8}
$$

#### Kết luận về Momentum

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/sgd-vs-momentum-example-plot.png"
    alt="Mô phỏng vector Momentum"
/>
<figcaption>Source: eloquentarduino.github.io</figcaption>
</figure>

Ta có thể thấy rằng đường đi của **Momentum** đã hẹp hơn so với **SGD** và tiến về phía cực trị nhanh hơn. Chúng ta sẽ biết được **Momentum** có thể vượt qua được local minima như thế nào trong hình minh họa ở phần tiếp theo.

#### Ưu điểm của Momentum

- Nhanh hơn so với SGD.
- Giảm thiểu sự dao động của đường đi.
- Có thể thoát ra khỏi local minima hay saddle point.

#### Nhược điểm của Momentum

- Khi đến đích, vì quán tính nên vẫn còn mất nhiều thời gian dao động tại chỗ trước khi có thể dừng lại.
- Phụ thuộc vào learning rate $\eta$.

### NAG

**Nesterov Accelerated Gradient** (NAG) là một biến thể của **Momentum**, phương pháp này sinh ra nhằm giải quyết vấn đề mất thời gian dao động khi đến đích của **Momentum**.

Ý tưởng của phương pháp này là dự đoán trước vị trí tiếp theo của $w$ dựa trên vector quán tính $v$ và hệ số $\alpha$ trước đó.

$$
\begin{aligned}
\hat{w} &= w - \alpha v \\
\end{aligned} \tag{9}
$$

Sau đó, ta sẽ tính gradient của tại vị trí dự đoán này và dùng nó để cập nhật lại các parameter $w$.

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/nag-vector.png"
    alt="Mô phỏng vector NAG"
/>
<figcaption>Source: cs231n.github.io</figcaption>
</figure>

Qua hình ảnh ta có thể hình dung được hướng đi của **NAG** là tổng của 2 vector: hướng đi trước đó và gradient tại vị trí dự đoán.

#### Thuật toán NAG

**Các bước thực hiện:**

1. Tìm $L$ dựa trên một điểm dữ liệu ngẫu nhiên $j$ đã chọn: $L = \frac{1}{2} (\hat{y}_j - y_j)^2$
2. Dự đoán vị trí tiếp theo của $w$: $\hat{w} = w - \alpha v$
3. Tính gradient của $L$ tại $\hat{w}$: $\nabla L(\hat{w})$
4. Tìm $\Delta \hat{w}$: $\Delta \hat{w} = \eta \nabla L(\hat{w})$.
5. Cập nhật lại vận tốc $v$: $v' = \alpha v + \Delta \hat{w}$
6. Cập nhật lại các parameter $w$: $w' = w - v'$.
7. Lặp lại các bước 1-6 trên cho đến khi đạt được điều kiện dừng.

**Công thức tổng quát:**

$$
\begin{aligned}
w_t &= w_{t-1} - \alpha v_{t-1} - \eta \nabla L(w_{t-1} - \alpha v_{t-1}) \\
\end{aligned} \tag{10}
$$

#### Kết luận về NAG

<figure>
<img
    className="w-full flex justify-center mx-auto"
    src="/static/images/posts/sgd-vs-momentum-vs-nag-example-plot.gif"
    alt="Mô phỏng quá trình NAG so với Momentum và SGD"
/>
<figcaption>Source: gbhat.com</figcaption>
</figure>

Ta có thể thấy rằng cả **Momentum** và **NAG** đều có khả năng vượt qua được local minima. Tuy nhiên, **NAG** không bị mất thời gian dao động khi đến đích như **Momentum**.

#### Ưu điểm của NAG

- Nhanh hơn so với Momentum.
- Giảm thiểu sự dao động của đường đi.
- Có thể thoát ra khỏi local minima hay saddle point.
- Không bị mất thời gian dao động khi đến đích.

#### Nhược điểm của NAG

- Phụ thuộc vào learning rate $\eta$.

### Adagrad

**Adaptive Gradient** (Adagrad) là một biến thể của **SGD**, phương pháp này sẽ sử dụng một learning rate $\eta$ biến thiên theo thời gian. Điều này giúp cho việc di chuyển nhanh hơn và giảm thiểu sự dao động của đường đi khi gần đến cực trị.

Ta cho $G$ là tổng bình phương của các gradient $\nabla L$ đã tính trước đó, $\epsilon$ là một hệ số rất nhỏ được thêm vào để tránh trường hợp $\eta$ chia cho $0$. Ta sẽ cập nhật lại $\eta$ theo công thức:

$$
\begin{aligned}
G' &= G + \nabla L(w)^2 \\
\eta' &= \frac{\eta}{\sqrt{G + \epsilon}}
\end{aligned} \tag{11}
$$

Với việc chia cho $\sqrt{G + \epsilon}$, ta sẽ có được một learning rate $\eta'$ nhỏ hơn so với $\eta$ ban đầu. Điều này giúp cho việc di chuyển nhanh hơn và giảm thiểu sự dao động của đường đi khi gần đến cực trị.

Nhờ đó, ta có thể cài đặt learning rate ban đầu thật cao để giúp cho việc di chuyển nhanh hơn rất nhiều so với **SGD** mà không cần lo việc không thể hội tụ về sau.

#### Thuật toán Adagrad

**Các bước thực hiện:**

1. Tìm $L$ dựa trên một điểm dữ liệu ngẫu nhiên $j$ đã chọn: $L = \frac{1}{2} (\hat{y}_j - y_j)^2$
2. Tính gradient của $L$ tại $w$: $\nabla L(w)$
3. Tính $G$: $G' = G + \nabla L(w)^2$
4. Tính learning rate $\eta$: $\eta' = \frac{\eta}{\sqrt{G' + \epsilon}}$
5. Tìm $\Delta w$: $\Delta w = \eta' \nabla L(w)$.
6. Cập nhật lại các parameter $w$: $w' = w - \Delta w$.
7. Lặp lại các bước 1-5 trên cho đến khi đạt được điều kiện dừng.

**Công thức tổng quát:**

$$
\begin{aligned}
w_t &= w_{t-1} - \frac{\eta}{\sqrt{G_{t-1} + \nabla L(w_{t-1})^2 + \epsilon}} \nabla L(w_{t-1}) \\
\end{aligned} \tag{12}
$$

#### Ưu điểm của Adagrad

- Nhanh hơn nhiều so với SGD.
- Giảm thiểu sự dao động của đường đi.
- Có thể tránh được saddle point.

#### Nhược điểm của Adagrad

- Phụ thuộc vào parameter số $w$ khởi tạo ban đầu.
- Thường rơi vào các local minima thay vì global minima.
- Tổng bình phương của các gradient có thể trở nên quá lớn khiến cho learning rate giảm nhanh và dừng lại trước khi đạt được cực trị.

### RMSProp/Adadelta

**RMSProp/Adadelta** là hai biến thể của **Adagrad**,
hai phương pháp này được phát triển đồng thời và độc lập, nhằm giải quyết vấn đề tổng bình phương của các gradient có thể trở nên quá lớn khiến cho learning rate giảm nhanh và dừng lại trước khi đạt được cực trị.

Ý tưởng của hai phương pháp này là thay vì cho $G$ là tổng bình phương của toàn bộ các gradient đã tính trước đó, ta sẽ cho $G$ là trung bình cộng của chính nó với bình phương của gradient hiện tại. Với ý nghĩa này, $G$ sẽ phụ thuộc vào phần lớn gradient trước đó.

Hệ số $\beta$ (thường được chọn là $0.9$) thể hiện mức độ quên đi gradient này.

$$
\begin{aligned}
G' &= \beta G + (1 - \beta) \nabla L(w)^2 \\
\eta' &= \frac{\eta}{\sqrt{G' + \epsilon}}
\end{aligned} \tag{13}
$$

#### Thuật toán RMSProp/Adadelta

**Các bước thực hiện:**

1. Tìm $L$ dựa trên một điểm dữ liệu ngẫu nhiên $j$ đã chọn: $L = \frac{1}{2} (\hat{y}_j - y_j)^2$
2. Tính gradient của $L$ tại $w$: $\nabla L(w)$
3. Tính $G$: $G' = \beta G + (1 - \beta) \nabla L(w)^2$
4. Tính learning rate $\eta$: $\eta' = \frac{\eta}{\sqrt{G' + \epsilon}}$
5. Tìm $\Delta w$: $\Delta w = \eta' \nabla L(w)$.
6. Cập nhật lại các parameter $w$: $w' = w - \Delta w$.
7. Lặp lại các bước 1-6 trên cho đến khi đạt được điều kiện dừng.

**Công thức tổng quát:**

$$
\begin{aligned}
w_t &= w_{t-1} - \frac{\eta}{\sqrt{\beta G_{t-1} + (1 - \beta) \nabla L(w_{t-1})^2 + \epsilon}} \nabla L(w_{t-1}) \\
\end{aligned} \tag{14}
$$

#### Ưu điểm của RMSProp/Adadelta

- Nhanh hơn so với Adagrad.
- Giảm thiểu sự dao động của đường đi.
- Có thể tránh được saddle point.
- Không xảy ra tình trạng learning rate giảm nhanh và dừng lại trước khi đạt được cực trị.

#### Nhược điểm của RMSProp/Adadelta

- Phụ thuộc vào parameter số $w$ khởi tạo ban đầu.
- Thường rơi vào các local minima thay vì global minima.

### Adam

Chúng ta có thể thấy từ **SGD** sinh ra hai trường phái khác nhau, một cái sử dụng lực quán tính, một cái sử dụng learning rate biến thiên. Và đây chính là ý tưởng của **Adam** (Adaptive Moment Estimation), phương pháp này thống nhất cả hai ý tưởng trên lại với nhau tạo nên một thuật toán mạnh mẽ. Đây cũng là thuật toán optimizer được sử dụng nhiều nhất hiện nay.

Ngoài $G$ dùng để lưu trữ trung bình cộng của bình phương các gradient, **Adam** định nghĩa thêm $M$ dùng để lưu trữ trung bình cộng của các gradient.

$$
\begin{aligned}
G' &= \beta_1 G + (1 - \beta_1) \nabla L(w)^2 \\
M' &= \beta_2 G + (1 - \beta_2) \nabla L(w) \\
\end{aligned} \tag{15}
$$

Như **RSMProp**, $\beta_1$ thường được cho là $0.9$, còn $\beta_2$ thường được cho là $0.999$.

Tuy nhiên vì $(1- \beta)$ quá nhỏ, do đó các giá trị này có xu hướng tiến về về $0$ sau khi khởi tạo, ta sẽ tính lại:

$$
\begin{aligned}
\hat{G} &= \frac{G}{1 - \beta_1} \\
\hat{M} &= \frac{M}{1 - \beta_1}
\end{aligned}
$$

#### Thuật toán Adam

**Các bước thực hiện:**

1. Tìm $L$ dựa trên một điểm dữ liệu ngẫu nhiên $j$ đã chọn: $L = \frac{1}{2} (\hat{y}_j - y_j)^2$
2. Tính gradient của $L$ tại $w$: $\nabla L(w)$
3. Tính $G$: $G' = \beta_1 G + (1 - \beta_1) \nabla L(w)^2$
4. Tính $M$: $M' = \beta_2 G + (1 - \beta_2) \nabla L(w)$
5. Tính $\hat{G}'$: $\hat{G}' = \frac{G'}{1 - \beta_1}$
6. Tính $\hat{M}'$: $\hat{M}' = \frac{M'}{1 - \beta_2}$
7. Tính learning rate $\eta$: $\eta' = \frac{\eta}{\sqrt{\hat{G}' + \epsilon}}$
8. Tìm $\Delta w$: $\Delta w = \eta' \hat{M}$.
9. Cập nhật lại các parameter $w$: $w' = w - \Delta w$.
10. Lặp lại các bước 1-8 trên cho đến khi đạt được điều kiện dừng.

**Công thức tổng quát:**

$$
\begin{aligned}
w_t &= w_{t-1} - \frac{\eta}{\sqrt{\frac{\beta_1 G_{t-1} + (1 - \beta_1) \nabla L(w_{t-1})^2}{1 - \beta_1} + \epsilon}} \frac{\beta_2 M_{t-1} + (1 - \beta_2) \nabla L(w_{t-1})}{1 - \beta_2} \\
\end{aligned} \tag{16}
$$

#### Ưu điểm của Adam

- Nhanh hơn so với RMSProp/Adadelta.
- Giảm thiểu sự dao động của đường đi.
- Có thể tránh được saddle point.
- Không xảy ra tình trạng learning rate giảm nhanh và dừng lại trước khi đạt được cực trị.
- Có thể thoát ra khỏi local minima.
- Không phụ thuộc vào parameter số $w$ khởi tạo ban đầu.
- Không phụ thuộc vào learning rate $\eta$.

#### Nhược điểm của Adam

Không có nhược điểm nào đáng kể.

### Nadam

Có lẽ chúng ta đã quên **NAG** với ý tưởng skip một bước bằng cách sử dụng gradient cho vị trí dự doán. **Nadam** (Nesterov-accelerated Adaptive Moment Estimation) là một biến thể của **Adam** kết hợp với **NAG**. Cho ra một thuật toán optimizer hoàn hảo và toàn diện.

Chúng ta sẽ không cần phải đi vào chi tiết thuật toán này.

## Kết luận

<figure>
<img
    className="w-full md:w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/optimizers-comparison.gif"
    alt="So sánh các thuật toán optimizer"
/>
<figcaption>Source: analyticsvidhya.com/</figcaption>
</figure>
