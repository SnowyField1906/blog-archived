---
title: QR Decomposition là gì và chi tiết cách tính
date: '2023-10-22'
tags: ['Machine Learning', 'Linear Algebra', 'Mathematics']
draft: false
summary: Giới thiệu về QR Decomposition và các khái niệm liên quan, hướng dẫn chi tiết cách tính QR Decomposition và triển khai bằng Python.
layout: PostView
thumbnail: '/static/images/thumbnails/qr-decomposition-la-gi-va-chi-tiet-cach-tinh.png'
---

_Các thuật toán decomposition (phân rã) cho ma trận là một trong những thuật toán quan trọng nhất trong Machine Learning nói chung và toán ứng dụng nói riêng. Những phép phân rã này không những giúp ta giảm độ phức tạp và chi phí khi thực hiện các phép tính với các ma trận lớn mà còn có những ứng dụng đặc biệt khác._

_Ở bài viết này, chúng ta sẽ cùng tìm hiểu về **QR Decomposition** (Phân rã QR) là gì và chi tiết cách tính bằng **Gram-Schmidt Process** (Chu trình Gram-Schmidt)._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/qr-decomposition-la-gi-va-chi-tiet-cach-tinh.png" alt="QR Decomposition là gì và chi tiết cách tính" />

## Khái niệm

**QR Decomposition** (Phân rã QR) là một phương pháp phân rã một ma trận bất kì thành tích của hai ma trận $\mathbf{Q}$ và $\mathbf{R}$, trong đó $\mathbf{Q}$ là một **Orthonormal Matrix** (Ma trận Trực chuẩn) và $\mathbf{R}$ là một **Upper Triangular Matrix** (Ma trận Tam giác trên).

> **⚠️ Lưu ý**
>
> Thuật ngữ **Orthonormal Matrix** hiếm khi được sử dụng mà thay vào đó, những ma trận như vậy sẽ được gọi là **Special Orthogonal Matrix** (Ma trận Trực giao Đặc biệt). Tuy nhiên, trong bài viết này, chúng ta sẽ sử dụng thuật ngữ **Orthonormal Matrix** để phân biệt với **Orthogonal Matrix** một cách tường minh và dễ hiểu hơn.

## Nhắc lại

### Ma trận

**Ma trận** là một tập hợp các **unit vector** (vector đơn vị) được sắp xếp theo hàng hoặc cột. Một ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ có thể được biểu diễn như sau:

$$
\begin{align*}
\mathbf{A} &= \begin{bmatrix} \mathbf{a}_1 & \mathbf{a}_2 & \dots & \mathbf{a}_n \end{bmatrix} \\
&= \begin{bmatrix} \mathbf{a}_{11} & \mathbf{a}_{12} & \dots & \mathbf{a}_{1n} \\ \mathbf{a}_{21} & \mathbf{a}_{22} & \dots & \mathbf{a}_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{a}_{m1} & \mathbf{a}_{m2} & \dots & \mathbf{a}_{mn} \end{bmatrix} \\
\end{align*} \tag{1}
$$

Các unit vector đóng vai trò định nghĩa lại một không gian mới bằng tổ hợp tuyến tính của chúng. Ví dụ như không gian 3 chiều cơ bản được định nghĩa bởi 3 unit vector $i = (1, 0, 0)$, $j = (0, 1, 0)$ và $k = (0, 0, 1)$:

$$
\begin{align*}
R^3 &= \begin{bmatrix} i & j & k \end{bmatrix} \\
&= \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \\
\end{align*}
$$

Ý nghĩa hình học của ma trận là nó biểu diễn một phép biến đổi tuyến tính, hay nói cách khác nó giống như một phép biến đổi một không gian này sang một không gian khác mà phép biến đổi này có thể là tổ hợp của các phép **rotate** (quay), **stretch** (co giãn), **trượt** (shear),...

Ma trận $\mathbf{A} \in \mathbb{R}^{m \times n}$ biểu diễn một phép biến đổi từ không gian $\mathbb{R}^n$ sang không gian $\mathbb{R}^m$.

### Linearly Dependent và Linearly Independent

#### Linearly Dependent

Một tập hợp các vector $\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n$ được gọi là **Linearly Dependent** (Phụ thuộc Tuyến tính) nếu tồn tại nghiệm là một tập hợp các hệ số $c_1, c_2, \dots, c_n$ không đồng thời bằng $0$ sao cho:

$$
\begin{align*}
c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \dots + c_n \mathbf{v}_n = 0 \tag{2}
\end{align*}
$$

Điều này có nghĩa là một trong các hệ số phải khác $0$, giả sử nếu $c_1 \neq 0$ thì:

$$
\begin{align*}
\begin{cases}
\mathbf{v}_1 = -\frac{c_2}{c_1} \mathbf{v}_2 - \dots - \frac{c_n}{c_1} \mathbf{v}_n &\text{khi} \enspace n > 1 \\
\mathbf{v}_1 = 0 &
\text{khi} \enspace n = 1 \\
\end{cases} \tag{3}
\end{align*}
$$

Lúc này, ta có thể thấy $\mathbf{v}_1$ đã không tạo ra một chiều không gian mới mà nó chỉ nằm trong không gian của các vector khác. Nói cách khác, $\mathbf{v}_1$ đã phụ thuộc tuyến tính vào các vector còn lại.

#### Linearly Independent

Ngược lại với linear dependence, một tập hợp các vector $\mathbf{v}_1, \mathbf{v}_2, \dots, \mathbf{v}_n$ được gọi là **Linearly Independent** (Độc lập Tuyến tính) nếu phương trình (2) chỉ có một nghiệm duy nhất là $c_1 = c_2 = \dots = c_n = 0$.

Vì lúc này các vector đều độc lập tuyến tính với nhau và phương trình chỉ bằng $0$ khi và chỉ khi tất cả các hệ số đều đồng thời bằng $0$.

### Orthogonal Matrix và Orthonormal Matrix

#### Orthogonal Matrix

Hai vector $\mathbf{u}$ và $\mathbf{v}$ được gọi là **Orthogonal** (Trực giao) khi và chỉ khi chúng vuông góc với nhau, tức là $\mathbf{u}^T \mathbf{v} = 0$.

Một **Orthogonal Matrix** (Ma Trận Trực giao) là một tập hợp các vector mà mọi cặp unit vector trong đó đều orthogonal với nhau.

Gọi $\mathbf{A}$ là một orthogonal matrix khi đó:

$$
\begin{align*}
\mathbf{A}^T \mathbf{A} = \mathbf{I} = \mathbf{A} \mathbf{A}^T \implies \mathbf{A}^{-1} = \mathbf{A}^T \tag{4}
\end{align*}
$$

#### Orthonormal Matrix

Hai vector $\mathbf{u}$ và $\mathbf{v}$ được gọi là **Orthonormal** (Trực chuẩn) khi và chỉ khi chúng là orthogonal và đồng thời có độ dài bằng $1$, tức là $\mathbf{u}^T \mathbf{v} = 0$ và $||\mathbf{u}|| = ||\mathbf{v}|| = 1$.

Một **Orthonormal Matrix** (Ma trận Trực chuẩn) là một trường hợp đặc biệt của orthogonal matrix khi nó bị ràng buộc bởi điều kiện rằng mọi unit vector trong đó đều có độ dài bằng $1$.

Vì các tính chất trên, nếu $\mathbf{A}$ là một orthonormal matrix thì nó sẽ thỏa mãn toàn bộ tính chất của một orthogonal matrix và $det(\mathbf{A}) = 1$.

### Vector Projection

Cho trước hai vector $\mathbf{u}$ và $\mathbf{v}$, ta có thể tính được **vector projection** (vector chiếu) của $\mathbf{v}$ lên $\mathbf{u}$ bằng công thức:

$$
\begin{align*}
proj_{\mathbf{u}} (\mathbf{v}) &= \frac{\langle \mathbf{u}, \mathbf{v} \rangle}{\langle \mathbf{u}, \mathbf{u} \rangle} \mathbf{u} \\
\end{align*} \tag{5}
$$

Trong đó:

- $\langle \mathbf{u}, \mathbf{v} \rangle$: **inner product** (tích vô hướng) của $\mathbf{u}$ và $\mathbf{v}$.
- $proj_{\mathbf{u}} (\mathbf{v})$: **vector projection** (hình chiếu) của $\mathbf{v}$ lên $\mathbf{u}$.

## Cách tính

Có hai phương pháp để thực hiện bài toán này là **Gram-Schmidt Process** (Chu trình Gram-Schmidt) và **Householder Reflection** (Phản chiếu Householder).

Chúng ta sẽ được giới thiệu về Gram-Schmidt Process trong bài viết này.

Cho trước ma trận linearly independent $\mathbf{A} \in \mathbb{R}^{m \times n}$ có các unit vector $\mathbf{a}_1, \mathbf{a}_2, \dots, \mathbf{a}_n$:

$$
\begin{align*}
\mathbf{A} &= \begin{bmatrix} \mathbf{a}_1 & \mathbf{a}_2 & \dots & \mathbf{a}_n \end{bmatrix} \\
&= \begin{bmatrix} \mathbf{a}_{11} & \mathbf{a}_{12} & \dots & \mathbf{a}_{1n} \\ \mathbf{a}_{21} & \mathbf{a}_{22} & \dots & \mathbf{a}_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ \mathbf{a}_{m1} & \mathbf{a}_{m2} & \dots & \mathbf{a}_{mn} \end{bmatrix} \\
\end{align*}
$$

### Bước 1: Trực giao hóa các unit vector

Chúng ta sẽ dùng Gram-Schmidt Process để tìm ra hệ trực giao là ma trận $\mathbf{V} \in \mathbb{R}^{m \times n}$ từ $\mathbf{A}$. Quá trình trực giao hóa từng vector của $\mathbf{A}$ được thực hiện như sau:

- Lấy $\mathbf{a}_1$ làm chuẩn, đây sẽ unit vector đầu tiên của $\mathbf{V}$, các unit vector khác sẽ được trực giao hóa dựa trên $\mathbf{a}_1$.

$$
\begin{align*}
\mathbf{v}_1 &= \mathbf{a}_1 \\
\end{align*} \tag{6}
$$

- $\mathbf{v}_2$ sẽ được trực giao dựa trên $\mathbf{v}_1$ bằng cách lấy $\mathbf{a}_2$ trừ đi hình chiếu của chính nó lên $\mathbf{v}_1$. Điều này sẽ giúp $\mathbf{v}_2$ vuông góc với $\mathbf{v}_1$.

$$
\begin{align*}
\mathbf{v}_2 &= \mathbf{a}_2 - proj_{\mathbf{v}_1} (\mathbf{a}_2) \\
\end{align*} \tag{7}
$$

- Tương tự với $\mathbf{v}_3$, tuy nhiên để đảm bảo vector này vuông góc với tất cả các vector trước đó, nó sẽ phức tạp hơn một chú vì ta sẽ phải trực giao nó dựa trên cả $\mathbf{v}_1$ và $\mathbf{v}_2$ (sau khi đã trực giao với $\mathbf{v}_1$, ta sẽ lấy nó đi trực giao tiếp với $\mathbf{v}_2$).

$$
\begin{align*}
\mathbf{v}_3 &= \mathbf{a}_3 - proj_{\mathbf{v}_1} (\mathbf{a}_3) - proj_{\mathbf{v}_2} (\mathbf{a}_3) \\
\end{align*} \tag{8}
$$

- Cuối cùng, ta có công thức tổng quát cho vector thứ $k$:

$$
\mathbf{v}_k = \mathbf{a}_k - \sum_{j=1}^{k-1} proj_{\mathbf{v}_j} (\mathbf{a}_k) \tag{9}
$$

### Bước 2: Trực chuẩn hóa không gian vừa tính được

Ta đã có ma trận $\mathbf{V}$ là một ma trận trực giao, tuy nhiên nó chưa phải là một ma trận trực chuẩn. Để trực chuẩn hóa nó, ta sẽ chia mỗi vector cột của $\mathbf{V}$ cho độ dài chính nó để đưa độ dài này về $1$.

Lúc này, ta tìm được ma trận $\mathbf{Q}$ là từ các vector đã được chuẩn hóa của $\mathbf{V}$.

$$
\begin{align*}
\mathbf{q}_k &= \frac{\mathbf{v}_k}{||\mathbf{v}_k||} \\
\end{align*} \tag{10}
$$

### Bước 3: Tìm ma trận $\mathbf{R}$

Ta có thể tìm được ma trận $\mathbf{R}$ bằng cách nhân ma trận $\mathbf{Q}^T$ với $\mathbf{A}$.

Chứng minh:

$$
\begin{align*}
\mathbf{A} &= \mathbf{Q} \mathbf{R} \\
\mathbf{Q}^T \mathbf{A} &= \mathbf{Q}^T \mathbf{Q} \mathbf{R} \\
\mathbf{Q}^T \mathbf{A} &= \mathbf{I} \mathbf{R} \tag*{\text{xem lại (4)}} \\
\mathbf{R} &= \mathbf{Q}^T \mathbf{A} \tag{11} \\
\end{align*}
$$

Ngoài ra, ta cũng có thể tìm được ma trận $\mathbf{R}$ bằng cách tính inner product của các unit vector từ ma trận $\mathbf{Q}$ với các unit vector từ ma trận $\mathbf{A}$.

$$
\begin{align*}
\mathbf{R} = \begin{bmatrix} \langle \mathbf{q}_1 , \mathbf{a}_1 \rangle & \langle \mathbf{q}_1 , \mathbf{a}_2 \rangle & \dots & \langle \mathbf{q}_1 , \mathbf{a}_n \rangle \\ 0 & \langle \mathbf{q}_2 , \mathbf{a}_2 \rangle & \dots & \langle \mathbf{q}_2 , \mathbf{a}_n \rangle \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \dots & \langle \mathbf{q}_n , \mathbf{a}_n \rangle \end{bmatrix} \tag{12}
\end{align*}
$$

Từ đây ta có thể hiểu được lí do $\mathbf{R}$ là một ma trận tam giác trên vì trong quá trình trực giao hóa, chúng ta cho vector $\mathbf{v}_k$ trực giao với toàn bộ các vector $i < k$, dẫn đến các inner product của chúng bằng $0$, xem lại $(9)$.

$$
\begin{align*}
&\langle \mathbf{v}_k , \mathbf{a}_i \rangle = 0 \\
\iff &\langle \mathbf{q}_k , \mathbf{a}_i \rangle = 0 \enspace \forall i < k \tag{13}
\end{align*}
$$

## Ví dụ

Hãy thực hiện QR Decomposition cho ma trận $\mathbf{A}$ được tạo bởi 3 vector $\mathbf{a}_1$, $\mathbf{a}_2$ và $\mathbf{a}_3$ như sau:

$$
\begin{align*}
\mathbf{a}_1 &= (1, 3, 2) \\
\mathbf{a}_2 &= (2, 2, 1) \\
\mathbf{a}_3 &= (3, 1, 2) \\
\end{align*} \tag{14}
$$

- Ta có ma trận $\mathbf{A}$:

$$
\begin{align*}
\mathbf{A} &= \begin{bmatrix} \mathbf{a}_1 & \mathbf{a}_2 & \mathbf{a}_3 \end{bmatrix} \\
&= \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 2 & 1 & 2 \end{bmatrix} \\
\end{align*} \tag{15}
$$

- Trực giao hóa ma trận $\mathbf{A}$:

$$
\begin{align*}
\mathbf{v}_1 &= \mathbf{a}_1 \\
&= (1, 3, 2) \\
\mathbf{v}_2 &= \mathbf{a}_2 - proj_{\mathbf{v}_1} (\mathbf{a}_2) \\
&= (2, 2, 1) - \frac{\langle \mathbf{v}_1, \mathbf{a}_2 \rangle}{\langle \mathbf{v}_1, \mathbf{v}_1 \rangle} \mathbf{v}_1 \\
&= (2, 2, 1) - \frac{2 \times 1 + 2 \times 3 + 1 \times 2}{1^2 + 3^2 + 2^2} (1, 3, 2) \\
&= (2, 2, 1) - \frac{5}{7} (1, 3, 2) \\
&= \frac{1}{7} (9, -1, -3) \\
\mathbf{v}_3 &= \mathbf{a}_3 - proj_{\mathbf{v}_1} (\mathbf{a}_3) - proj_{\mathbf{v}_2} (\mathbf{a}_3) \\
&= (3, 1, 2) - \frac{\langle \mathbf{v}_1, \mathbf{a}_3 \rangle}{\langle \mathbf{v}_1, \mathbf{v}_1 \rangle} \mathbf{v}_1 - \frac{\langle \mathbf{v}_2, \mathbf{a}_3 \rangle}{\langle \mathbf{v}_2, \mathbf{v}_2 \rangle} \mathbf{v}_2 \\
&= (3, 1, 2) - \frac{3 \times 1 + 1 \times 3 + 2 \times 2}{1^2 + 3^2 + 2^2} (1, 3, 2) - \frac{\frac{1}{7} (3 \times 9 + 1 \times -1 + 2 \times -3)}{\frac{1}{7^2} (9^2 + (-1)^2 + (-3)^2)} \frac{1}{7} (9, -1, -3) \\
&= (3, 1, 2) - \frac{5}{7} (1, 3, 2) - \frac{20}{91} (9, -1, -3) \\
&= \frac{4}{13} (1, -3, 4) \\
\end{align*} \tag{16}
$$

- Ta có ma trận $\mathbf{V}$:

$$
\begin{align*}
\mathbf{V} &= \begin{bmatrix} \mathbf{v}_1 & \mathbf{v}_2 & \mathbf{v}_3 \end{bmatrix} \\
&= \begin{bmatrix} 1 & 9 & 1 \\ 3 & -1 & -3 \\ 2 & -3 & 4 \end{bmatrix} \\
\end{align*} \tag{17}
$$

- Trực chuẩn hóa ma trận $\mathbf{V}$:

$$
\begin{align*}
\mathbf{q}_1 &= \frac{\mathbf{v}_1}{||\mathbf{v}_1||} \\
&= \frac{1}{\sqrt{1^2 + 3^2 + 2^2}} (1, 3, 2) \\
&= \frac{1}{\sqrt{14}} (1, 3, 2) \\
\mathbf{q}_2 &= \frac{\mathbf{v}_2}{||\mathbf{v}_2||} \\
&= \frac{1}{\sqrt{9^2 + (-1)^2 + (-3)^2}} (9, -1, -3) \\
&= \frac{1}{\sqrt{91}} (9, -1, -3) \\
\mathbf{q}_3 &= \frac{\mathbf{v}_3}{||\mathbf{v}_3||} \\
&= \frac{1}{\sqrt{1^2 + (-3)^2 + 4^2}} (1, -3, 4) \\
&= \frac{1}{\sqrt{26}} (1, -3, 4) \\
\end{align*} \tag{18}
$$

- Ta có ma trận $\mathbf{Q}$:

$$
\begin{align*}
\mathbf{Q} &= \begin{bmatrix} \mathbf{q}_1 & \mathbf{q}_2 & \mathbf{q}_3 \end{bmatrix} \\
&= \begin{bmatrix} \frac{1}{\sqrt{14}} & \frac{9}{\sqrt{91}} & \frac{1}{\sqrt{26}} \\ \frac{3}{\sqrt{14}} & -\frac{1}{\sqrt{91}} & -\frac{3}{\sqrt{26}} \\ \frac{2}{\sqrt{14}} & -\frac{3}{\sqrt{91}} & \frac{4}{\sqrt{26}} \end{bmatrix} \\
&\approx \begin{bmatrix} 0.26726124 & 0.94345635 & 0.19611614 \\ 0.80178373 & -0.10482848 & -0.58834841 \\ 0.53452248 & -0.31448545 & 0.78446454 \end{bmatrix} \\
\end{align*} \tag{19}
$$

- Tính tích $\mathbf{Q}^T \mathbf{A}$:

$$
\begin{align*}
\langle \mathbf{q}_1 , \mathbf{a}_1 \rangle &= \frac{1}{\sqrt{14}} (1 \times 1 + 3 \times 3 + 2 \times 2) = \sqrt{14} \\
\langle \mathbf{q}_1 , \mathbf{a}_2 \rangle &= \frac{1}{\sqrt{14}} (1 \times 2 + 3 \times 2 + 2 \times 1) = \frac{10}{\sqrt{14}} \\
\langle \mathbf{q}_1 , \mathbf{a}_3 \rangle &= \frac{1}{\sqrt{14}} (1 \times 3 + 3 \times 1 + 2 \times 2) = \frac{10}{\sqrt{14}} \\
\langle \mathbf{q}_2 , \mathbf{a}_2 \rangle &= \frac{3}{\sqrt{91}} (9 \times 2 - 1 \times 2 - 3 \times 1) = \frac{13}{\sqrt{91}} \\
\langle \mathbf{q}_2 , \mathbf{a}_3 \rangle &= \frac{3}{\sqrt{91}} (9 \times 3 - 1 \times 1 - 3 \times 2) = \frac{20}{\sqrt{91}} \\
\langle \mathbf{q}_3 , \mathbf{a}_3 \rangle &= \frac{1}{\sqrt{26}} (1 \times 3 - 3 \times 1 + 4 \times 2) = \frac{8}{\sqrt{26}} \\
\end{align*} \tag{20}
$$

- Ta có ma trận $\mathbf{R}$:

$$
\begin{align*}
\mathbf{R} &= \begin{bmatrix} \langle \mathbf{q}_1 , \mathbf{a}_1 \rangle & \langle \mathbf{q}_1 , \mathbf{a}_2 \rangle & \langle \mathbf{q}_1 , \mathbf{a}_3 \rangle \\ 0 & \langle \mathbf{q}_2 , \mathbf{a}_2 \rangle & \langle \mathbf{q}_2 , \mathbf{a}_3 \rangle \\ 0 & 0 & \langle \mathbf{q}_3 , \mathbf{a}_3 \rangle \end{bmatrix} \\
&= \begin{bmatrix} \sqrt{14} & \frac{10}{\sqrt{14}} & \frac{10}{\sqrt{14}} \\ 0 & \frac{13}{\sqrt{91}} & \frac{20}{\sqrt{91}} \\ 0 & 0 & \frac{8}{\sqrt{26}} \end{bmatrix} \\
&\approx \begin{bmatrix} 3.74165739 & 2.67261242 & 2.67261242 \\ 0 & 1.36277029 & 2.09656967 \\ 0 & 0 & 1.56892908 \end{bmatrix} \\
\end{align*} \tag{21}
$$

- Như vậy, ta đã tìm được ma trận $\mathbf{Q}$ và $\mathbf{R}$ thỏa mãn:

$$
\begin{align*}
\mathbf{Q} \mathbf{R} &= \begin{bmatrix} \frac{1}{\sqrt{14}} & \frac{9}{\sqrt{91}} & \frac{1}{\sqrt{26}} \\ \frac{3}{\sqrt{14}} & -\frac{1}{\sqrt{91}} & -\frac{3}{\sqrt{26}} \\ \frac{2}{\sqrt{14}} & -\frac{3}{\sqrt{91}} & \frac{4}{\sqrt{26}} \end{bmatrix} \begin{bmatrix} \sqrt{14} & \frac{10}{\sqrt{14}} & \frac{10}{\sqrt{14}} \\ 0 & \frac{13}{\sqrt{91}} & \frac{20}{\sqrt{91}} \\ 0 & 0 & \frac{8}{\sqrt{26}} \end{bmatrix} \\
&= \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 2 & 1 & 2 \end{bmatrix} \\
&= \mathbf{A} \\
\end{align*} \tag{22}
$$

> Kiểm tra phép tính tại đây: [Matrix Calculator](https://matrixcalc.org/#%7B%7B1/14%5E0%2e5,9/91%5E0%2e5,1/26%5E0%2e5%7D,%7B3/14%5E0%2e5,-1/91%5E0%2e5,-3/26%5E0%2e5%7D,%7B2/14%5E0%2e5,-3/91%5E0%2e5,4/26%5E0%2e5%7D%7D*%7B%7B14%5E0%2e5,10/14%5E0%2e5,10/14%5E0%2e5%7D,%7B0,13/91%5E0%2e5,20/91%5E0%2e5%7D,%7B0,0,8/26%5E0%2e5%7D%7D)

## Triển khai code Python

Toàn bộ code có thể xem chi tiết tại: [snowyfield1906/ai-general-research/least_squares
/least_squares.py](https://github.com/SnowyField1906/ai-general-research/blob/main/least_squares/least_squares.py).

### Thuật toán chính

```python
def qr_decomposition(A: np.array) -> (np.array, np.array):
    m, n = A.shape

    # Orthogonalization
    V = np.empty((m, 0), float)
    for i in range(n):
        u_i = get(A, i)

        for j in range(i):
            v_j = get(V, j)
            u_i -= orthogonalize(u_i, v_j)

        v_i = u_i
        V = append(V, v_i)

    # Orthonormalization
    Q = np.empty((m, 0), float)
    for i in range(n):
        v_i = get(V, i)
        q_i = v_i / normalize(v_i)
        Q = append(Q, q_i)

    # Compute R
    R = Q.T @ A

    return Q, R
```

### Các hàm phụ trợ

```python
def inner_product(v1: np.array, v2: np.array) -> float:
    product = 0
    for i in range(len(v1)):
        product += v1[i] * v2[i]
    return product

def normalize(v: np.array) -> float:
    norm = 0
    for elem in v:
        norm += (elem ** 2)
    return norm ** 0.5

def orthogonalize(u: np.array, v: np.array) -> np.array:
    return (inner_product(u, v) * v) / (normalize(v) ** 2)

def get(A: np.array, i: int) -> np.array:
    a_i = A.copy()[:, i]
    return a_i

def append(A: np.array, v: np.array) -> np.array:
    return np.insert(A, len(A[0]), v, axis=1)
```

### Kiểm thử

```python
A = np.array([
    [1, 2, 3],
    [3, 2, 1],
    [2, 1, 2],
], dtype=float)

Q, R = qr_decomposition(A)
print("Q:", Q)
print("R:", R)
print("Q @ R:", Q @ R)
```

```txt
> Q: [[ 0.26726124  0.94345635  0.19611614]
 [ 0.80178373 -0.10482848 -0.58834841]
 [ 0.53452248 -0.31448545  0.78446454]]
> R: [[3.74165739e+00 2.67261242e+00 2.67261242e+00]
 [0.00000000e+00 1.36277029e+00 2.09656967e+00]
 [0.00000000e+00 1.11022302e-16 1.56892908e+00]]
> Q @ R: [[1. 2. 3.]
 [3. 2. 1.]
 [2. 1. 2.]]
```

## Sử dụng thư viện `numpy`

```python
import numpy as np

A = np.array([
    [1, 2, 3],
    [3, 2, 1],
    [2, 1, 2],
], dtype=float)

Q, R = np.linalg.qr(A)
print("Q:", Q)
print("R:", R)
print("Q @ R:", Q @ R)
```

```txt
> Q: [[-0.26726124  0.94345635  0.19611614]
 [-0.80178373 -0.10482848 -0.58834841]
 [-0.53452248 -0.31448545  0.78446454]]
> R: [[-3.74165739 -2.67261242 -2.67261242]
 [ 0.          1.36277029  2.09656967]
 [ 0.          0.          1.56892908]]
> Q @ R: [[1. 2. 3.]
 [3. 2. 1.]
 [2. 1. 2.]]
```
