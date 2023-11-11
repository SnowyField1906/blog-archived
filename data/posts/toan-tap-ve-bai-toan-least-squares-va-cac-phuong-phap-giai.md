---
title: Toàn tập về bài toán Least Squares và các phương pháp giải
date: '2023-10-16'
tags:
  [
    'Supervised Learning',
    'Machine Learning',
    'Optimization',
    'Linear Algebra',
    'Calculus',
    'Mathematics',
  ]
draft: false
summary: Giới thiệu chi tiết về phương pháp Least Squares và cách giải bài toán Least Squares bằng các phương pháp khác nhau.
layout: PostView
thumbnail: '/static/images/thumbnails/toan-tap-ve-bai-toan-least-squares-va-cac-phuong-phap-giai.png'
---

_Hồi quy là một bài toán kinh điển trong Machine Learning mà Least Squares (Bình phương Tối tiểu) là một trong những phương pháp phổ biến. Bằng cách xây dựng một model tương quan giữa các biến đầu vào và biến mục tiêu từ dữ liệu huấn luyện, chúng ta có thể dự đoán giá trị mục tiêu cho các dữ liệu mới._

_Trong bài viết này, chúng ta sẽ tìm hiểu về Least Squares và các phương pháp giải cụ thể và chi tiết cho bài toán này._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/toan-tap-ve-bai-toan-least-squares-va-cac-phuong-phap-giai.png" alt="Toàn tập về bài toán Least Squares và các phương pháp giải" />

> Khuyến nghị đọc trước [QR Decomposition là gì và chi tiết cách tính](https://snowyfield.software/posts/qr-decomposition-la-gi-va-chi-tiet-cach-tinh) và [Singular Value Decomposition là gì và chi tiết cách tính](https://snowyfield.software/posts/singular-value-decomposition-la-gi-va-chi-tiet-cach-tinh) để sẵn sàng trước khi đi vào bài viết này.

## Bài toán Least Squares

### Nhắc lại

#### Model

**Model** (Mô hình) mà chúng ta hay nghe qua thực chất là một hàm số $f(x, \theta)$ với $x$ là một tập hợp các **input** (đầu vào) và $\theta$ là một tập hợp các **parameter** (tham số).

Với mỗi giá trị $x$, model sẽ cho ra một giá trị $y$ là **output** (đầu ra) tương ứng. $y$ thể là một câu trả lời cho một câu hỏi nào đó, một bức ảnh được tạo ra hay một dự đoán về một sự kiện trong tương lai.

#### Ma trận

**Ma trận** là một tập hợp các số được sắp xếp thành các hàng và cột. Nó giúp biểu diễn các chiều không gian cao hơn.

Ý nghĩa hình học của ma trận là nó biểu diễn một phép biến đổi tuyến tính, hay nói cách khác nó giống như một hàm số biến đổi một không gian này sang một không gian khác mà phép biến đổi này có thể là tổ hợp của các phép **rotate** (quay), **stretch** (co giãn), **trượt** (shear),...

Ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ biểu diễn một phép biến đổi từ không gian $\mathbb{R}^n$ sang không gian $\mathbb{R}^m$.

#### Least Squares

**Least Squares** (Bình phương Tối tiểu) là một phương pháp tối ưu hóa để lựa chọn một đường khớp nhất cho một tập hợp các điểm dữ liệu. Đường khớp nhất là đường có tổng bình phương sai số nhỏ nhất giữa các điểm dữ liệu và đường đó.

Nghiệm của bài toán Least Squares là tập hợp giá trị của các **parameter** ứng với hàm số đã chọn. Từ đó ta sẽ có được một model có thể dự đoán được giá trị **output** cho một **input** bất kì.

### Công thức

Gọi sự chênh lệch giữa giá trị quan sát được $y$ và giá trị mà model dự đoán $\hat{y}$ là $e$.

$$
\begin{align*}
e &= \hat{y} - y \\
&= f(x, \theta) - y \tag{1}
\end{align*}
$$

Ta có thể tính được tổng bình phương sai số $S$:

$$
\begin{align*}
S &= \sum_{i=1}^{n} (\hat{y_i} - y_i) \\
\end{align*}
$$

Tuy nhiên $e$ có thể nhận giá trị âm, dẫn đến việc không thể so sánh được với các giá trị khác. Vì vậy chúng ta sẽ nâng cấp hàm $S$ như sau:

$$
\begin{aligned}
S &= \sum_{i=1}^{n} |\hat{y_i} - y_i|
\end{aligned}
$$

Lúc này $S$ đã phản ánh đúng chức năng của việc mô phỏng độ lệch giữa 2 tập giá trị, tuy nhiên hàm trị tuyệt đối $|x|$ là một hàm không khả vi tại $x = 0$, nên chúng ta không thể dùng nó để tính đạo hàm / gradient. Vì vậy chúng ta sẽ sử dụng hàm bình phương để thay thế cho hàm trị tuyệt đối:

$$
\begin{aligned}
L = \frac{1}{2}(\hat{y} - y)^2 \tag{2}
\end{aligned}
$$

Lí do $\frac{1}{2}$ được thêm vào là để đơn giản hóa việc tính đạo hàm / gradient của $L$: $\nabla L = \hat{y} - y$.

Sau khi tìm được nghiệm, chúng ta có thể quan sát được vị trí tương quan giữa các điểm dữ liệu và model.

<figure>
<img className="w-full md:w-1/2 flex justify-center mx-auto" alt="Đường hồi quy" src="/static/images/posts/sum-of-squares.png" />
<figcaption className="text-center text-gray-500">Source: ProProcessEngineer (YouTube)</figcaption>
</figure>

### Lời giải

Cho $f(x, \theta)$ là một model có $m$ tham số: $\theta = \{\theta_0, \theta_1, \dots, \theta_m\}$.

Để $S$ đạt giá trị nhỏ nhất, ta sẽ phải tìm các parameter $\theta$ sao cho $S$ đạt cực trị, vì cực trị duy nhất của $S$ sẽ luôn rơi vào trường hợp cực tiểu do đây là tổng của các $r^2 \geq 0$.

Lúc này, ta chỉ cần đặt gradient của $S$ về $0$, hay đặt đạo hàm của $S$ về $0$ theo từng parameter $\theta$, vì lúc này $\theta$ có vai trò như là một biến/ẩn.

$$
\begin{align*}
\nabla S(\theta) &= \vec{0} \\
\frac{\partial S}{\partial \theta_j} &= 0 \quad \text{với} \quad j = 0, 1, \dots, m \\
\frac{\partial}{\partial \theta_j} \left( \frac{1}{2} \sum_{i=1}^{n} r_i^2 \right) &= 0 \\
\sum_{i=1}^{n} r_i \frac{\partial r_i}{\partial \theta_j} &= 0 \\
\sum_{i=1}^{n} (f(x_i, \theta) - y_i) \frac{\partial (f(x_i, \theta) - y_i)}{\partial \theta_j} &= 0 \\
\sum_{i=1}^{n} (f(x_i, \theta) - y_i) \frac{\partial f(x_i, \theta)}{\partial \theta_j} &= 0 \tag{3} \\
\end{align*}
$$

Phương trình trên áp dụng cho mọi bài toán Bình phương Tối tiểu.

### Ví dụ

Cho tập dữ liệu $(x, y)$ có độ lớn $n = 10$:

$$
\begin{array}{c|c|c|c|c|c|c|c|c|c|c}
x & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
\hline
y & 1 & 3 & 2 & 5 & 7 & 8 & 8 & 9 & 10 & 12 \\
\end{array} \tag{4}
$$

#### Mô hình $y = \theta_0 + \theta_1 x$

Từ $(3)$, ta có hệ phương trình:

$$
\begin{align*}
& \begin{cases}
\sum (\theta_0 + \theta_1 x_i - y_i) \frac{\partial f(x_i, \theta)}{\partial \theta_0} &= 0 \\
\sum (\theta_0 + \theta_1 x_i - y_i) \frac{\partial f(x_i, \theta)}{\partial \theta_1} &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
\sum (\theta_0 + \theta_1 x_i - y_i) &= 0 \\
\sum (\theta_0 + \theta_1 x_i - y_i) x_i &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
\sum \theta_0 + \theta_1 \sum x_i - \sum y_i &= 0 \\
\sum \theta_0 x_i + \theta_1 \sum x_i^2 - \sum x_i y_i &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
n \theta_0 + \theta_1 \sum x_i - \sum y_i &= 0 \\
\theta_0 \sum x_i + \theta_1 \sum x_i^2 - \sum x_i y_i &= 0 \tag{5} \\
\end{cases} \\
\end{align*}
$$

Từ $(4)$, ta có:

$$
\begin{array}{c|c|c|c|c}
t & x & y & x^2 & xy \\
\hline
\sum{t} & 55 & 65 & 385 & 454 \\
\end{array}
$$

Thay vào $(5)$, ta được:

$$
\begin{align*}
& \begin{cases}
10 \theta_0 + 55 \theta_1 - 67 &= 0 \\
55 \theta_0 + 385 \theta_1 - 550 &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
\theta_0 &\approx 0.07 \\
\theta_1 &\approx 1.17 \\
\end{cases} \\
\end{align*}
$$

<figure>
<img className="w-full md:w-1/2 flex justify-center mx-auto" alt="Đường hồi quy" src="/static/images/posts/assignment-1-chart.png" />
<figcaption className="text-center text-gray-500">Nghiệm của bài toán là $y = 0.07 + 1.17x$</figcaption>
</figure>

#### Mô hình $y = \theta_0 + \theta_1 e^x + \theta_2 x^2$

Từ $(3)$, ta có hệ phương trình:

$$
\begin{align*}
& \begin{cases}
\sum (\theta_0 + \theta_1 e^{x_i} + \theta_2 x_i^2 - y_i) \frac{\partial f(x_i, \theta)}{\partial \theta_0} &= 0 \\
\sum (\theta_0 + \theta_1 e^{x_i} + \theta_2 x_i^2 - y_i) \frac{\partial f(x_i, \theta)}{\partial \theta_1} &= 0 \\
\sum (\theta_0 + \theta_1 e^{x_i} + \theta_2 x_i^2 - y_i) \frac{\partial f(x_i, \theta)}{\partial \theta_2} &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
\sum (\theta_0 + \theta_1 e^{x_i} + \theta_2 x_i^2 - y_i) &= 0 \\
\sum (\theta_0 + \theta_1 e^{x_i} + \theta_2 x_i^2 - y_i) e^{x_i} &= 0 \\
\sum (\theta_0 + \theta_1 e^{x_i} + \theta_2 x_i^2 - y_i) x_i^2 &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
\sum \theta_0 + \theta_1 \sum e^{x_i} + \theta_2 \sum x_i^2 - \sum y_i &= 0 \\
\sum \theta_0 e^{x_i} + \theta_1 \sum e^{2x_i} + \theta_2 \sum e^{x_i} x_i^2 - \sum e^{x_i} y_i &= 0 \\
\sum \theta_0 x_i^2 + \theta_1 \sum e^{x_i} x_i^2 + \theta_2 \sum x_i^4 - \sum x_i^2 y_i &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
n \theta_0 + \theta_1 \sum e^{x_i} + \theta_2 \sum x_i^2 - \sum y_i &= 0 \\
\theta_0 \sum e^{x_i} + \theta_1 \sum e^{2x_i} + \theta_2 \sum e^{x_i} x_i^2 - \sum e^{x_i} y_i &= 0 \\
\theta_0 \sum x_i^2 + \theta_1 \sum e^{x_i} x_i^2 + \theta_2 \sum x_i^4 - \sum x_i^2 y_i &= 0 \tag{6} \\
\end{cases} \\
\end{align*}
$$

Từ $(4)$, ta có:

$$
\begin{array}{c|c|c|c|c|c|c|c|c}
t & y & x^2 & x^2 y & e^x & e^x y & e^{2x} & e^{x} x^2 & x^4 \\
\hline
\sum{t} & 65 & 385 & 3552 &34843,77 & 385554,49 & 561102107 & 920186,51 & 25333
\end{array}
$$

Thay vào $(6)$, ta được:

$$
\begin{align*}
& \begin{cases}
10 \theta_0 + 34843,77 \theta_1 + 25333 \theta_2 - 65 &= 0 \\
34843,77 \theta_0 + 561102107 \theta_1 + 920186,51 \theta_2 - 385554,49 &= 0 \\
25333 \theta_0 + 920186,51 \theta_1 + 25333 \theta_2 - 3552 &= 0 \\
\end{cases} \\
\implies
& \begin{cases}
\theta_0 &\approx 0.1140 \\
\theta_1 &\approx 0.0007 \\
\theta_2 &\approx 0.0016 \\
\end{cases} \\
\end{align*}
$$

### Mở rộng

Ta có thể đưa bài toán về dạng ma trận miễn là model có dạng đa thức như sau:

$$
\begin{align*}
y &= \sum_{i=1}^{n} a_i \phi_i(x) \\
y &= a_1 \phi_1(x) + a_2 \phi_2(x) + \dots + a_n \phi_n(x) \\
\begin{bmatrix} y_1 \\ y_2 \\ \vdots \\ y_n \end{bmatrix} &= \begin{bmatrix} \phi_1(x_1) & \phi_2(x_1) & \dots & \phi_n(x_1) \\ \phi_1(x_2) & \phi_2(x_2) & \dots & \phi_n(x_2) \\ \vdots & \vdots & \ddots & \vdots \\ \phi_1(x_m) & \phi_2(x_m) & \dots & \phi_n(x_m) \end{bmatrix} \begin{bmatrix} a_1 \\ a_2 \\ \vdots \\ a_n \end{bmatrix} \\
\mathbf{y} &= \mathbf{A} \mathbf{x} \tag{7} \\
\end{align*}
$$

Trong đó, $\mathbf{A} \in \mathbb{R}^{m \times n}$ là một ma trận chứa giá trị của các **Basic Function** (Hàm số Cơ bản) $\phi$ tại các điểm $x$ đã cho.

> **📝 Nhắc lại**
>
> **Basic Function** (Hàm số Cơ bản) là một hàm số mà các hàm số khác có thể được biểu diễn dưới dạng tổng tuyến tính của nó. Có nghĩa là ma trận $\mathbf{A}$ có thể biểu diễn được.
>
> Ví dụ: $y = \theta_0 sin(x) + \theta_1 cos(x)$ có thể biểu diễn được bằng ma trận $\mathbf{A} = \begin{bmatrix} sin(x_i) & cos(x_i) \end{bmatrix}$ với các basic function là $sin(x)$ và $cos(x)$. Trong khi đó $y = sin(\theta_0 x) + cos(\theta_1 x)$ không thể biểu diễn được vì các parameter $\theta_0$ và $\theta_1$ nằm trong hàm số.

Cho trước $\mathbf{b} \in \mathbb{R}^m$ là một vector chứa các giá trị $y$ quan sát được, lúc này nhiệm vụ của chúng ta là xấp xỉ nghiệm của $\mathbf{y}$ theo $\mathbf{b}$ với sai số nhỏ nhất:

$$
\begin{align*}
\mathbf{y} &\approx \mathbf{b} \\
\mathbf{A} \mathbf{x} &\approx \mathbf{b} \tag{8} \\
\end{align*}
$$

Lúc này bài toán trở thành tìm vector $\mathbf{x} \in \mathbb{R}^n$ sao cho:

$$
\begin{align*}
&\min_{x} ||\mathbf{y} - \mathbf{b}||_2 \\
= &\min_{x} ||\mathbf{A}\mathbf{x} - \mathbf{b}||_2 \tag{9}
\end{align*}
$$

Tập nghiệm của bài toán này là:

$$
\begin{align*}
\mathbf{A} \mathbf{x} &= \mathbf{b} \\
\mathbf{A}^T \mathbf{A} \mathbf{x} &= \mathbf{A}^T \mathbf{b} \\
\mathbf{x} &= (\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T \mathbf{b} \\
\mathbf{x} &= \mathbf{A}^\dagger \mathbf{b} \tag{10} \\
\end{align*}
$$

> **📝 Nhắc lại**
>
> $\mathbf{A}$ là **Non-singular Matrix** (Ma trận Khả nghịch) khi và chỉ khi $\mathbf{A}$ là **ma trận vuông** và **full rank** (đủ hạng). Vì vậy, trong nhiều trường hợp, chúng ta có thể thay thế $\mathbf{A}^{-1}$ bằng $\mathbf{A}^\dagger$. Đây là một **Pseudo Inverse Matrix** (Ma trận Giả Nghịch) được tính bằng $(\mathbf{A}^T \mathbf{A})^{-1} \mathbf{A}^T$, vì $\mathbf{A}^T\mathbf{A}$ luôn khả nghịch.
>
> Ý nghĩa hình học của **Inverse Matrix** (Ma trận Nghịch đảo) là nếu $\mathbf{A}$ biến đổi một không gian nào đó thì $\mathbf{A}^{-1}$ sẽ biến đổi lại về không gian ban đầu. Trong khi đó **Pseudo Inverse Matrix** sẽ biến đổi về một không gian với các chiều gần giống không gian ban đầu nhất.

Trong trường hợp lí tưởng, khi mà ma trận $\mathbf{A}$ khả nghịch (full rank và vuông) thì đồng nghĩa với việc phương trình $\mathbf{A} \mathbf{x} = \mathbf{b}$ có nghiệm duy nhất. Đồng nghĩa với việc tồn tại một đường đi qua tất cả các điểm đã cho.

Tất nhiên, trong mọi trường hợp thì hầu hết thì phương trình trên sẽ vô nghiệm, hay ma trận $\mathbf{A}$ sẽ không khả nghịch. Do đó chúng ta nhờ đến **Pseudo Inverse Matrix** vì nó sẽ giúp ta xấp xỉ được nghiệm lí tưởng cho bài toán.

### Ví dụ

Sử dụng tập dữ liệu ở $(4)$ để xấp xỉ đường thẳng $y = \theta_0 + \theta_1 x + \theta_2 x^2$.

$$
\begin{align*}
\mathbf{A} &= \begin{bmatrix} 1 & 1 & 1 \\ 1 & 2 & 4 \\ \vdots & \vdots & \vdots \\ 1 & 10 & 100 \end{bmatrix} \quad \mathbf{b} = \begin{bmatrix} 1 \\ 3 \\ \vdots \\ 12 \end{bmatrix} \\
\implies \mathbf{A}^T \mathbf{A} &= \begin{bmatrix} 10 & 55 & 385 \\ 55 & 385 & 3025 \\ 385 & 3025 & 25333 \end{bmatrix} \\
\implies (\mathbf{A}^T \mathbf{A})^{-1} &= \begin{bmatrix} 1.38 & -0.526 & 0.0417 \\ -0.525 & 0.241 & -0.0208 \\ 0.0417 & -0.0208 & 0.00189 \end{bmatrix} \\
\implies (\mathbf{A}^T \mathbf{A})^{-1}\mathbf{A}^T &= \begin{bmatrix}
0,9 & 0,5 & 0,18 & -0,05 & -0,2 & -0,27 & -0,25 & -0,15 & 0,03 & 0,3 \\
-0,3 & -0,13 & 0,01 & 0,1 & 0,16 & 0,17 & 0,14 & 0,07 & -0,04 & -0,2 \\
0,02 & 0,008 & -0,004 & -0,011 & -0,015 & -0,015 & -0,011 & -0,004 & 0,008 & 0,023
\end{bmatrix} \\
\implies (\mathbf{A}^T \mathbf{A})^{-1}\mathbf{A}^T\mathbf{b} &= \begin{bmatrix} -0.43 \\ 1.42 \\ -0.02 \end{bmatrix} \\
\end{align*}
$$

<figure>
<img className="w-full md:w-1/2 flex justify-center mx-auto" alt="Đường hồi quy" src="/static/images/posts/assignment-3-chart.png" />
<figcaption className="text-center text-gray-500">Nghiệm của bài toán là $y = -0.43 + 1.42x - 0.02x^2$</figcaption>
</figure>

## QR Decomposition

**QR Decomposition** (Phân rã QR) là một phương pháp phân rã một ma trận bất kì thành tích của hai ma trận $\mathbf{Q}$ và $\mathbf{R}$, trong đó $\mathbf{Q}$ là một **Orthonormal Matrix** (Ma trận Trực chuẩn) và $\mathbf{R}$ là một **Upper Triangular Matrix** (Ma trận Tam giác trên).

### Giải bài toán Least Squares bằng QR Decomposition

Một khi thể phân rã $\mathbf{A}$ thành tích của hai ma trận $\mathbf{Q}$ và $\mathbf{R}$, thay vì dùng ma trận giả nghịch như $(9)$, ta có thể biến đổi thành:

$$
\begin{align*}
\mathbf{A} \mathbf{x} &= \mathbf{b} \\
\mathbf{Q} \mathbf{R} \mathbf{x} &= \mathbf{b} \\
\mathbf{R} \mathbf{x} &= \mathbf{Q}^T \mathbf{b} \\
\mathbf{x} &= \mathbf{R}^{-1} \mathbf{Q}^T \mathbf{b} \tag{18} \\
\end{align*}
$$

## Singular Value Decomposition

**Singular Value Decomposition** (Phân tích Suy biến) là một phương pháp phân rã một ma trận bất kì thành tích của ba ma trận $\mathbf{U}$, $\mathbf{\Sigma}$ và $\mathbf{V}^T$, trong đó $\mathbf{U}$ và $\mathbf{V}$ là các **Orthonormal Matrix** (Ma trận Trực chuẩn) và $\mathbf{\Sigma}$ là một **Diagonal Matrix** (Ma trận Đường chéo).

### Giải bài toán Least Squares bằng Singular Value Decomposition

Quay lại $(7)$, ta có thể phân rã $\mathbf{A}$ thành tích của ba ma trận $\mathbf{U}$, $\mathbf{\Sigma}$ và $\mathbf{V}^T$, khi đó $(7)$ trở thành:

$$
\begin{align*}
\mathbf{A} \mathbf{x} &= \mathbf{b} \\
\mathbf{U} \mathbf{\Sigma} \mathbf{V}^T \mathbf{x} &= \mathbf{b} \\
\mathbf{\Sigma} \mathbf{V}^T \mathbf{x} &= \mathbf{U}^T \mathbf{b} \\
\mathbf{V}^T \mathbf{x} &= \mathbf{\Sigma}^{-1} \mathbf{U}^T \mathbf{b} \\
\mathbf{x} &= \mathbf{V} \mathbf{\Sigma}^{-1} \mathbf{U}^T \mathbf{b} \tag{19} \\
\end{align*}
$$

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/least_squares
/least_squares.py](https://github.com/SnowyField1906/ai-general-research/blob/main/least_squares/least_squares.py).
