---
title: Ứng dụng Fast Fourier Transform trong phép nhân số nguyên lớn
date: '2024-02-17'
tags: ['Number Theory', 'Mathematics']
draft: false
summary: Bài viết này sẽ giới thiệu một giải pháp hiệu quả của bài toán nhân 2 số nguyên lớn bằng cách sử dụng Fast Fourier Transform.
layout: PostView
thumbnail: '/static/images/thumbnails/ung-dung-fast-fourier-transform-trong-phep-nhan-so-nguyen-lon.png'
---

_Phép nhân 2 số nguyên là một trong những bài toán lớn trong lĩnh vực **Cryptography** (Mật mã học). Nó ảnh hưởng trực tiếp đến hiệu suất của các thuật toán mã hoá, giải mã và các thuật toán khác. Nhân 2 số nguyên với $n$ chữ số có thể được thực hiện với độ phức tạp $O(n \log(n) \log(\log(n)))$ bằng cách sử dụng **Fast Fourier Transform** thay vì $O(n^2)$ bằng cách thông thường._

_Kĩ thuật này sử dụng phương pháp **Polynomial Multiplication** (Nhân Đa thức) và **Recursive Divide and Conquer** (Chia Để Trị). Một trong những triển khai hiệu quả của Fast Fourier Transform trong việc tìm tích của 2 số nguyên lớn là thuật toán **Schönhage–Strassen**._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/ung-dung-fast-fourier-transform-trong-phep-nhan-so-nguyen-lon.png" alt="Ứng dụng Fast Fourier Transform trong phép nhân số nguyên lớn" />

## Giới thiệu

Như đã đề cập, việc nhân 2 số nguyên $n$ chữ số yêu cầu độ phức tạp là $O(n^2)$, đây là độ phức tạp khổng lồ khi các thuật toán mã hoá thường xử lí các số nguyên lên đến $4096$ bit. Do đó, con số tối đa là $2^{4096} - 1$ (gồm $4096$ bit $1$). Khi đó, độ dài của số nguyên này trong hệ thập phân sẽ là:

$$
\begin{aligned}
\left\lfloor \frac{\log(2^{4096} - 1)}{\log(10)}\right\rfloor + 1 = 1234
\end{aligned}
$$

Với con số tối thiểu $2^{4096 - 1}$ (bit $1$ đầu tiên và $4095$ bit $0$), độ dài của số nguyên này trong hệ thập phân gần như là tương đương:

$$
\begin{aligned}
\left\lfloor \frac{\log(2^{4096 - 1})}{\log(10)}\right\rfloor + 1 = 1233
\end{aligned}
$$

Điều này có nghĩa là độ dài $4096$ trong hệ nhị phân sẽ tương đương với độ dài $1233$ trong hệ thập phân. Đây là con số đủ lớn để độ phức tạp $O(n^2)$ trở thành một vấn đề cần giải quyết.

### Phép nhân truyền thống

Để giải thích tại sao độ phức tạp của phép nhân 2 số nguyên theo cách thông thường là $O(n^2)$, ta sẽ xem xét một ví dụ cụ thể.

Cho 2 số nguyên $123$ và $456$, ta sẽ thực hiện phép nhân như sau:

$$
\begin{equation*}\begin{array}{c}
\phantom{+++++++++++} \ 123 \ \\
\phantom{++++++++++} \times \ 456 \ \\
\hline
\phantom{00}6 \times 3 + \phantom{00}6 \times 20 + \phantom{00}6 \times 100 \phantom{0} + \\
\phantom{0}50 \times 3 + \phantom{0}50 \times 20 + \phantom{0}50 \times 100 \phantom{0} + \\
400 \times 3 + 400 \times 20 + 400 \times 100 \phantom{0+} \\
\hline
\phantom{++++++++++} 56088 \ \\
\end{array}\end{equation*}
$$

Dù có thực hiện phương pháp gì, chúng ta cũng sẽ phải đi qua tổng cộng $3 \times 3 = 9$ bước tính. Cho nên độ phức tạp sẽ luôn là $O(n^2)$.

### Polynomial Multiplication

Ta sẽ coi một số nguyên dương $N$ là một đa thức $P(x)$ thoả mãn:

$$
\begin{align}
P(x) = \sum_{i=0}^{n-1} a_ix^i
\end{align}
$$

Trong đó:
- $x$ là **base** (cơ số) của $N$
- $a$ là **coefficient vector** (vector hệ số) của $N$.

Ví dụ, cho số nguyên $123456789$, với base $B = 10$, ta sẽ có coefficient vector $a = [9, 8, 7, 6, 5, 4, 3, 2, 1]$. Lúc này, đa thức $P(x)$ sẽ là:

$$
P(x) = 9x^0 + 8x^1 + 7x^2 + 6x^3 + 5x^4 + 4x^5 + 3x^6 + 2x^7 + 1x^8
$$

Ngoài ra, với số nguyên trên:
- Với base $B = 100$, ta sẽ có $a = [89, 67, 45, 23, 1]$
- Với base $B = 1000$, ta sẽ có $a = [789, 456, 123]$
- Với base $B = 16$, ta sẽ có $a = [5, 1, 13, 12, 11, 5, 7]$ (tương đương $\text{0x51d0b57}$, là biểu diễn hexadecimal của $123456789$ dưới dạng little-endian).

Nhưng tại sao chúng ta lại biểu diễn dưới dạng little-endian như vậy mà không đảo ngược lại (cho $x^8$ ở vị trí đầu tiên)? Câu trả lời là việc biểu diễn **least significant digit** (chữ số hàng đơn vị) ở vị trí bit đầu tiên sẽ giúp máy tính tính toán nhanh hơn.

Ví dụ với phép cộng và trừ, chúng ta phải bắt đầu từ hàng đơn vị, sau đó lưu **carry** (nhớ) lại để cộng cho hàng tiếp theo. Việc di chuyển đến hàng chục, hàng trăm, hàng nghìn,... chỉ đơn giản là di chuyển đến phần tử tiếp theo của vector. Trong khi đó, cách biểu diễn big-endian sẽ buộc chúng ta phải di chuyển đến phần tử cuối cùng của vector trước rồi mới có thể lùi lại dần để tính. Hơn nữa, việc lưu kết quả cũng dễ hơn rất nhiều vì chúng ta lưu kết quả của phép tính từ phải sang trái.

Và quan trọng nhất, với little-endian, chúng ta có thể thoải mái resize vector (hay chèn các số $0$ vào cuối vector) sẽ không ảnh hưởng đến giá trị số nguyên. Trong khi đó, với big-endian, việc thêm một số $0$ sẽ làm số nguyên cộng thêm một lượng $B^n$. Dẫn đến việc vô cùng bất tiện khi resize mảng để thực hiện các phép nhân đa thức (vì chúng ta phải dịch toàn bộ các phần tử ra sau để chèn các số $0$ vào các vị trí đầu tiên).

## Thuật toán Fast Fourier Transform

### Recursive Divide and Conquer

Chúng ta sẽ chia đa thức $P(x)$ thành 2 đa thức con $P_{even}(x)$ và $P_{odd}(x)$.

Trong đó:
- $P_{even}(x)$ là đa thức con của $P(x)$ với các hệ số ở vị trí chẵn.
- $P_{odd}(x)$ là đa thức con của $P(x)$ với các hệ số ở vị trí lẻ.

Ví dụ, đa thức $P(x) = a_0 + a_1x + a_2x^2 + \dots + a_{n-1}x^{n-1}$ sẽ được chia thành:

$$
\begin{align}
P_{even}(x) = a_0 + a_2x + a_4x^2 + \dots + a_{n-2}x^{n/2 - 1} \\
P_{odd}(x) = a_1 + a_3x + a_5x^2 + \dots + a_{n-1}x^{n/2 - 1}
\end{align}
$$

Khi đó, ta có thể viết lại đa thức $P(x)$ thành:

$$
\begin{align}
P(x) = P_{even}(x^2) + xP_{odd}(x^2)
\end{align}
$$

### Primitive n-th Root of Unity

Cho số phức $w$ là **Primitive n-th Root of Unity** (Căn Đơn vị Nguyên thủy bậc n). Ta định nghĩa **n-th root of unity** (căn đơn vị bậc n) là các số phức thoả phương trình $w^n - 1 = 0$. Trong đó tính **primitive** (nguyên thủy) cho biết các số phức $w$ được coi là nghiệm khi và chỉ khi nó không phải là k-th root of unity với bất kì $k < n$.

<figure>
<img className="w-full flex justify-center mx-auto" alt="Roots of Unity" src="/static/images/posts/roots-of-unity.png" />
<figcaption className="text-center text-gray-500">Source: wuchuanxun (Github)</figcaption>
</figure>

Nghiệm của phương trình trên là một tập hợp các số phức $X = \{w_0, w_1, \dots, w_{k-1}\}$ cách đều nhau trên một **unit circle** (đường tròn đơn vị) trong mặt phẳng phức. Để hiểu tại sao lại là **n-th root** (căn bậc n), đây là dạng đầy đủ của nghiệm $w^k_n$:

$$
\begin{align}
w^k_n &= e^{2\pi i k/n} \notag \\
&= \cos\left(\frac{2\pi k}{n}\right) + i \sin\left(\frac{2\pi k}{n}\right) \quad \text{với } k = 0, 1, \dots, n - 1
\end{align}
$$

> Lưu ý: Kí hiệu mũ $k$ ở đây không phải là mũ bậc $k$ mà là chỉ số của phần tử trong tập hợp $X$. Nói cách khác, $w^k_n = X_n[k]$.

Ta có 2 tính chất quan trọng bên dưới.

#### Reflection

**Reflection** (Phản xạ) cho biết nếu $w$ là primitive n-th root of unity, trong đó $n \geq 2$ và $n$ chẵn, thì $w^{k + n/2}_n = -w^k_n$ với mọi $k = 0, 1, \dots, \frac{n}{2} - 1$:

$$
\begin{align}
w^{k + n/2}_n &= \cos\left(\frac{2\pi (k + n/2)}{n}\right) + i \sin\left(\frac{2\pi (k + n/2)}{n}\right) \notag \\
&= -\cos\left(\frac{2\pi k}{n}\right) - i \sin\left(\frac{2\pi k}{n}\right) \notag \\
&= -w^k_n
\end{align}
$$

Từ đây, ta suy ra với $k = 0$:

$$
\begin{align}
w^{n/2}_n &= -w^0_n \notag \\
&= -1
\end{align}
$$

#### Reduction

**Reduction** (Phân rã) cho biết nếu $w$ là primitive (kn)-th root of unity, thì $w^k$ là primitive n-th root of unity:

$$
\begin{align}
w^k_{kn} &= \cos\left(\frac{2\pi k}{kn}\right) + i \sin\left(\frac{2\pi k}{kn}\right) \notag \\
&= \cos\left(\frac{2\pi k}{n}\right) + i \sin\left(\frac{2\pi k}{n}\right) \notag \\
&= w^k_n
\end{align}
$$

Từ đây, ta suy ra với $k = 2$:

$$
\begin{align}
w^2_{2n} &= w^2_n
\end{align}
$$

#### Phát triển thuật toán

Đặt $w^k_n = x$, ta có thể viết lại đa thức $P(x)$ thành:

$$
\begin{align}
y_k &= P(w^k_n) \notag \\
&= \sum_{j=0}^{n - 1} a_j \times w^{kj}_n \quad \text{với } k = 0, 1, \dots, n - 1
\end{align}
$$

Trong đó, với mỗi $k = 0, 1, \dots, \frac{n}{2} - 1$ (một nửa phần tử đầu tiên), ta có thể viết lại như sau:

$$
\begin{align}
P(w^k_n) = P_{even}(w^{2k}_n) + w^k_nP_{odd}(w^{2k}_n) \quad \text{với } k = 0, 1, \dots, \frac{n}{2} - 1
\end{align}
$$

Còn với $k = \frac{n}{2}, \frac{n}{2} + 1, \dots, n - 1$ (một nửa phần tử còn lại), ta sẽ dùng các tính chất trên để thực hiện một số phép biến đổi:

$$
\begin{align}
P(w^{k + n/2}_n) &= P_{even}(w^{2k + n}_n) + w^{k + n/2}_nP_{odd}(w^{2k + n}_n) \quad \text{với } k = 0, 1, \dots, \frac{n}{2} - 1 \notag \\
&= P_{even}(w^{2k}_nw^n_n) + w^k_nw^{n/2}_nP_{odd}(w^{2k}_nw^n_n) \notag \\
&= P_{even}(w^{2k}_n) - w^k_nP_{odd}(w^{2k}_n) \\
\end{align}
$$

### Pseudocode thuật toán Fast Fourier Transform

Xem triển khai chi tiết bằng C++ tại: [SnowyField1906/big-unsigned-integer/biguint.cpp](https://github.com/SnowyField1906/big-unsigned-integer/blob/main/biguint.cpp#L24-L53)

$$
\begin{aligned}
&\textbf{Algorithm: } \text{Thuật toán Fast Fourier Transform (FFT)} \\
&\textbf{Input: } \\
&\quad \quad \text{coefficient vector } a \leftarrow [a_0, a_1, \dots, a_{n-1}] \\
&\textbf{Procedure: } \text{FFT}(a, \text{invert}) \\
&\quad \quad \textbf{if } n \leftarrow 1 \ \textbf{then} \\
&\quad \quad \quad \quad \textbf{return } \\
&\quad \quad \textbf{end if} \\
&\quad \quad a_{\text{even}} \leftarrow [a_0, a_2, a_4, \dots, a_{n-2}] \\
&\quad \quad a_{\text{odd}} \leftarrow [a_1, a_3, a_5, \dots, a_{n-1}] \\
&\quad \quad \text{FFT}(a_{\text{even}}), \enspace \text{FFT}(a_{\text{odd}}) \\
&\quad \quad \text{angle} \leftarrow 2 \times \pi / n \\
&\quad \quad w \leftarrow 1, \enspace w_n \leftarrow \cos(\text{angle}) + i \times \sin(\text{angle}) \\
&\quad \quad \textbf{for } k \leftarrow 0, 1, \dots, n/2 - 1 \textbf{ do} \\
&\quad \quad \quad \quad y[k] \leftarrow a_{\text{even}}[k] + w \times a_{\text{odd}}[k] \\
&\quad \quad \quad \quad y[k + n/2] \leftarrow a_{\text{even}}[k] - w \times a_{\text{odd}}[i] \\
&\quad \quad \quad \quad w \leftarrow w \times w_n \\
&\quad \quad \textbf{end for} \\
&\textbf{End Procedure}
\end{aligned}
$$

### Độ phức tạp thuật toán Fast Fourier Transform

Sử dụng **Master Theorem** (Định lý Master), ta nhận thấy thuật toán chia ra làm 2 phần, mỗi phần có kích thước là $n/2$ còn lại có độ phức tạp là $O(n)$, do đó độ phức tạp thời gian của thuật toán là:

$$
T(n) = 2 \times T\left(\frac{n}{2}\right) + O(n) = O(n \log(n))
$$

## Thuật toán Schönhage–Strassen

### Inverse Fast Fourier Transform

Cho 2 số nguyên viết dưới dạng đa thức là $A(x)$ và $B(x)$, khi đó:

$$
\begin{align}
(A \times B)(x) &= A(x) \times B(x) \notag \\
\implies \text{FFT}(A \times B) &= \text{FFT}(A) \times \text{FFT}(B) \notag \\
\implies A \times B &= \text{FFT}^{-1}(\text{FFT}(A) \times \text{FFT}(B))
\end{align}
$$

Ta sẽ gọi $\text{FFT}^{-1}$ là **Inverse Fast Fourier Transform**, có thuật toán tương tự như $\text{FFT}$, tuy nhiên $\text{FFT}^{-1}$ sẽ có tác dụng chuyển đổi từ một vector các giá trị $y$ về một coefficient vector $a$.

Hay nói cách khác $\text{FFT}^{-1}$ giống như một phép **interpolation** (nội suy) tìm một đa thức thoả mãn các giá trị cho trước, bằng một vài phép biến đổi ma trận, ta sẽ có được công thức bên dưới:

$$
\begin{align}
a_k &= \frac{1}{n}\sum_{j=0}^{n-1} y_j \times w^{-kj}_n \quad \text{với } k = 0, 1, \dots, n - 1 \\
\end{align}
$$


Tất nhiên độ dài vector giá trị $y$ và độ dài coefficient vector $a$ là bằng nhau và bằng $n$. Vì với $n$ phần tử là đủ để xác định một đa thức bậc $n - 1$. Đây là tính chất cơ bản trong phép interpolation.

Vì công thức trên hoàn toàn tương đồng với công thức của $\text{FFT}$, nên ta có thể sử dụng lại thuật toán $\text{FFT}$ để tìm $\text{FFT}^{-1}$. Trong đó, thay vì dùng $w^{k}_n$, ta sẽ dùng $w^{-k}_n$:

$$
\begin{align}
w^{-k}_n &= \cos\left(-\frac{2\pi k}{n}\right) + i \times \sin\left(-\frac{2\pi k}{n}\right) \notag \\
\end{align}
$$

Do đó, chúng ta sẽ gán $\text{angle} = -2 \times \pi / n$ trong thuật toán.  Sau khi có được coefficient vector $A \times B$, ta sẽ thực hiện bước cuối cùng là chuẩn hoá về base $B$ của số nguyên.

### Pseudocode thuật toán Schönhage–Strassen

Xem triển khai chi tiết bằng C++ tại: [SnowyField1906/big-unsigned-integer/biguint.cpp](https://github.com/SnowyField1906/big-unsigned-integer/blob/main/biguint.cpp#L256-L305)

$$
\begin{aligned}
&\textbf{Algorithm: } \text{Thuật toán Schönhage–Strassen trong phép nhân 2 số nguyên lớn} \\
&\textbf{Input: } \\
&\quad \quad \text{coefficient vector của vế trái } a \leftarrow [a_0, a_1, \dots, a_{n-1}] \\
&\quad \quad \text{coefficient vector của vế phải } b \leftarrow [b_0, b_1, \dots, b_{n-1}] \\
&\textbf{Output: } \\
&\quad \quad \text{coefficient vector } c \leftarrow [c_0, c_1, \dots, c_{2n-1}] \text{ sao cho } c = a \times b \\
&\textbf{Function: } \text{Schönhage–Strassen}(a, b) \\
&\quad \quad n \leftarrow 1 \\
&\quad \quad \textbf{while } n < \max(a.\text{size}(), b.\text{size}()) \textbf{ do} \\
&\quad \quad \quad \quad n \leftarrow n \times 2 \\
&\quad \quad \textbf{end while} \\
&\quad \quad a.\text{resize}(n), \enspace b.\text{resize}(n) \\
&\quad \quad \text{FFT}(a), \enspace \text{FFT}(b) \\
&\quad \quad c \leftarrow a \times b \\
&\quad \quad \text{FFT}^{-1}(c) \\
&\quad \quad \text{carry} \leftarrow 0 \\
&\quad \quad \textbf{for } i \leftarrow 0, 1, \dots, n - 1 \textbf{ do} \\
&\quad \quad \quad \quad c[i] \leftarrow \text{round}(c[i].\text{real()}) + \text{carry} \\
&\quad \quad \quad \quad \text{carry} \leftarrow c[i] / \text{B} \\
&\quad \quad \quad \quad c[i] \leftarrow c[i] \pmod{\text{B}} \\
&\quad \quad \textbf{end for} \\
&\textbf{End Function}
\end{aligned}
$$

### Độ phức tạp thuật toán Schönhage–Strassen

Với mỗi FFT ta có độ phức tạp là $O(n \log(n))$, do đó độ phức tạp thời gian của thuật toán là:

$$
T(n) = n \times T\left(2n + \frac{1}{2} \log(n)\right) + O(n \log(n)) = O(n \log(n) \log(\log(n)))
$$

## Đọc thêm

Còn bối rối? Dưới đây là một số kiến thức đã được đề cập trong bài viết:

- [Fast Fourier Transform](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
- [Root of Unity](https://en.wikipedia.org/wiki/Root_of_unity)
- [Divide-and-conquer algorithm](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm)
- [Master theorem (analysis of algorithms)](https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms))
- [Schönhage–Strassen algorithm](https://en.wikipedia.org/wiki/Sch%C3%B6nhage%E2%80%93Strassen_algorithm)
- [What is the advantage of little endian format?](https://softwareengineering.stackexchange.com/questions/95556/what-is-the-advantage-of-little-endian-format)
- [Ratio of Bits to Decimal Digits](https://www.exploringbinary.com/ratio-of-bits-to-decimal-digits/)
- [SnowyField1906/big-unsigned-integer](https://github.com/SnowyField1906/big-unsigned-integer)