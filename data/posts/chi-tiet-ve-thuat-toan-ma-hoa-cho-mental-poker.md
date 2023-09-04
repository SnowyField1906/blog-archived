---
title: Chi tiết về thuật toán mã hóa cho Mental Poker
date: '2023-09-01'
tags: ['Poker', 'ZKP', 'Blockchain', 'Cryptography']
draft: false
summary: Tìm hiểu về Mental Poker, tính khả thi trong việc triển khai Poker trên Blockchain bằng Zero-Knowledge Proof
layout: PostView
thumbnail: '/static/images/thumbnails/chi-tiet-ve-thuat-toan-ma-hoa-cho-mental-poker.png'
---

_Các trò chơi online ngày nay đang trở thành một phần quan trọng của cuộc sống giải trí của con người. Tuy nhiên, với sự phát triển của các trò chơi này, việc đảm bảo tính bảo mật và an toàn cho người dùng trong những trò chơi yêu cầu tính bảo mật và ẩn danh cao là một thách thức lớn. Điều này trở nên đặc biệt quan trọng khi chúng ta xem xét đến các trò chơi sử dụng tiền bạc thật như các casino._

_Tuy nhiên, vấn đề này có thể được giải quyết bằng cách sử dụng Zero-Knowledge Proof (ZKP) và Blockchain để loại bỏ bên thứ 3, tăng tính bảo mật cho người chơi và tính minh bạch cho trò chơi._

<img className="w-full flex justify-center mx-auto" src="/static/images/thumbnails/chi-tiet-ve-thuat-toan-ma-hoa-cho-mental-poker.png" alt="Chi tiết về thuật toán mã hóa cho Mental Poker" />

Trước khi đi vào bài viết, chúng ta có thể tìm hiểu về ZKP tại bài viết [Zero-Knowledge Proof là gì và cách hoạt động](https://snowyfield.vercel.app/posts/zero-knowledge-proof-la-gi-va-cach-hoat-dong).

## Giới thiệu về Mental Poker

**Mental Poker** (Poker Tinh thần) là tên gọi chung của một loạt các vấn đề về Cryptography (Mật mã học) liên quan đến việc chơi một trò chơi online mà không cần đếm đến bên thứ 3.

Nhưng tại sao lại là Poker? Vì nó là một ví dụ hoàn hảo để đại diện cho vấn đề trên.
Trong bài viết này, quy ước rằng Poker được đề cập đến là Texas Hold'em.

### Vấn đề

Để hiểu rõ hơn, trong khi mọi người cùng nhau chơi một ván bài ngoài đời thực.
Sẽ rất khó để ai đó có thể gian lận (như xem bài của người khác, hoặc thay đổi bài của mình) mà không bị phát hiện.

Nhưng khi chúng ta chơi từ xa (qua bưu điện hay online), mọi thứ sẽ trở nên khác.
Chúng ta sẽ không thể biết được những người khác có đang thực sự trung thực, hay liệu các hành động của mình có được thực sự bảo mật để không bị người khác biết được hay không.

Để tránh điều này, hầu hết các trò chơi online đều tổ chức theo kiểu Dealer (Nhà cái) và người chơi.
Dealer sẽ quản lí và nắm giữ thông tin của các người chơi để tránh việc người chơi tương tác trực tiếp với nhau nhằm gian lận.
Ví dụ trong một ván bài, Dealer sẽ xáo bài và đưa ra các quyết định.

Nó tuy an toàn hơn việc người chơi tự xáo bài nhưng điều này buộc chúng ta phải tin tưởng vào Dealer tuyệt đối, vì:

- Dealer hoàn toàn biết được toàn bộ lá bài và có thể bị đọc được bởi các quản trị viên của nó.
- Hacker có thể có được thông tin về các lá bài của người chơi khi tấn công vào trò chơi.
- Dealer có thể thao túng làm thay đổi giá trị của các lá bài mà người chơi không thể biết.

Rõ ràng Dealer là một client (máy chủ), hoàn toàn có thể bị hack hoặc bị thâm nhập bởi các quản trị viên của nó.
Tồi tệ hơn là chúng ta không thể biết được ván bài vừa rồi có bị hack hay bị quản trị viên thao túng hay không.

### Giải pháp

Để giải quyết vấn đề này, chúng ta cần phải loại bỏ dealer ra khỏi trò chơi.
Nhưng lúc này, người thực hiện việc xáo bài chính là người chơi, dẫn đến một số vấn đề mới như người xáo bài cuối cùng hoàn toàn biết được toàn bộ các lá bài.

Do đó, trò chơi phải được triển khai bằng những bằng những thuật toán mã hóa đặc biệt để giúp người chơi tương tác trực tiếp với nhau mà không cần phải tin tưởng nhau.

## Commutative Encryption

**Commutative Encryption** (Mã hóa Giao hoán) là một phương pháp mã hóa cho phép chúng ta giải mã mà không cần phải theo thứ tự.
Hay nói cách khác, nếu một dữ liệu được mã hóa nhiều lần thì chúng ta có thể giải mã theo bất kỳ thứ tự nào mà vẫn ra đúng dữ liệu ban đầu.

Ví dụ, khi Bob có một tin nhắn từ Alice và tin nhắn này bị mã hóa bởi mật khẩu cả hai, thì dù cho Bob giải mã trước rồi Alice giải mã sau hay ngược lại thì vẫn ra được tin nhắn ban đầu.

Để hình tượng hóa phương pháp này, hãy liên tưởng đến một chiếc hộp đã được khóa và chúng ta muốn khóa thêm một lần nữa:

- Đối với các phương pháp mã hóa thông thường, chúng ta sẽ khóa lên chiếc ổ khóa cũ.
  Lúc này, để mở được hộp, chúng ta phải mở ổ khóa bên ngoài trước để có thể mở ổ khóa bên trong.
- Nhưng đối với Commutative Encryption, chúng ta chỉ việc khóa thêm một ổ khóa.
  Lúc này, chúng ta có thể mở được hộp mà không cần phải quan tâm đến thứ tự mở khóa.

## Giới thiệu về thuật toán

Để đảm bảo người xáo bài cuối cùng không biết được toàn bộ các lá bài, chúng ta cần phải sử dụng một thuật toán xáo bài đặc biệt sử dụng Commutative Encryption.
Thuật toán này sẽ được thực hiện như ví dụ sau:

### Ví dụ

Alice và Bob cùng nhau chơi một ván bài Poker và cùng đồng ý một bộ bài nhất định, có nghĩa là họ biết được và đồng ý về các giá trị và số lượng của các lá bài này.

#### Giai đoạn I: Xáo bộ bài

1. Alice tạo cho mình một mật khẩu và dùng nó mã hóa từng lá bài này.
2. Alice xáo từng lá bài đó theo cách của Alice.
3. Alice gửi bộ này cho Bob.
4. Bob cũng tạo cho mình một mật khẩu và dùng nó để mã hóa lại từng lá bài.
5. Bob xáo lại từng lá bài đó theo cách của Bob.
6. Bob gửi lại bộ bài này cho Alice.

#### Giai đoạn II: Khóa từng lá bài

7. Alice giải mã các lá bài bằng mật khẩu của mình, tuy nhiên nó vẫn còn bị mã hóa bởi mật khẩu của Bob.
8. Alice mã hóa lần nữa từng lá bài, nhưng khác với lần trước, mỗi lá bài sẽ được mã hóa bởi những mật khẩu riêng biệt do Alice nắm giữ.
9. Alice gửi lại bộ bài này cho Bob.
10. Bob giải mã các lá bài bằng mật khẩu của mình, tuy nhiên nó vẫn còn bị mã hóa bởi lớp mật khẩu khác của Alice.
11. Bob mã hóa lần nữa từng lá bài, giống như Alice, mỗi lá bài sẽ được mã hóa bởi những mật khẩu riêng biệt do Bob nắm giữ.
12. Bob gửi lại bộ bài này cho Alice.

#### Giai đoạn III: Giải mã các lá bài của nhau

13. Mỗi bên sẽ nhận được hai lá bài, giả sử Alice sẽ nhận được lá bài thứ 1 và 3, còn Bob nhận được lá bài thứ 2 và 4.
14. Bob gửi cho Alice mật khẩu của lá bài thứ 1 và 3.
15. Alice giải mã hai lá bài trên tay bằng các mật khẩu mà mình đã mã hóa và các mật khẩu mà Bob vừa gửi. Sau đó gửi mật khẩu của lá bài thứ 2 và 4 cho Bob.
16. Bob cũng giải mã hai lá bài trên tay bằng các mật khẩu mà mình đã mã hóa và các mật khẩu mà Alice vừa gửi.
    Lúc này cả hai đều có thể biết được hai lá bài trên tay của mình.

#### Giai đoạn IV: Lật các lá bài trên bàn

17. Alice và Bob sẽ đặt tiền cược và lật các lá bài (từ 5 đến 10). Rõ ràng, các lá bài này chỉ có thể lộ ra khi cả hai cùng đồng thuận lật bài.
    Hay nói cách khác, nếu xảy ra gian lận, chỉ có thể rằng tất cả mọi người cùng nhau đồng ý gian lận.
18. Khi đến với phần xác định người thắng cuộc, Alice và Bob sẽ giải mã các lá bài của nhau để xem bài.

### Kết luận

Như vậy, với thuật toán này, chúng ta có thể đảm bảo rằng người xáo bài cuối cùng không biết được toàn bộ các lá bài.
Đối với những sòng có nhiều người chơi hơn, chúng ta chỉ cần thêm các bước mã hóa và giải mã của họ trong mỗi giai đoạn.

## Chi tiết quá trình triển khai

### Quy ước kí hiệu

Kí hiệu là $\alpha \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{G}$ cho biết phần tử $\alpha$ được chọn ngẫu nhiên từ $\mathbb{G}$.

### Giả định

Cho một nhóm gồm $l$ người chơi được đánh dấu bằng chỉ số $i$:

$$
i \in \{1, 2, \ldots, l\}
$$

Và bộ bài $D$ được sử dụng gồm các lá bài:

$$
D = \{d_1, d_2, \ldots, d_{52}\}
$$

Biết rằng với mỗi lá bài $d_i$ có thể được biểu diễn như sau:

$$
d_i = (s_i, r_i) \enspace \text{với} \enspace
\begin{cases}
    s_i \in \{1, 2, 3, 4\} \\
    r_i \in \{1, 2, \ldots, 13\}
\end{cases}
$$

Giả định rằng các người chơi đồng ý sử dụng [Finitely Generated Abelian Group](https://en.wikipedia.org/wiki/Finitely_generated_abelian_group) (Nhóm Abel Hữu hạn Sinh) $\mathbb{G}$ cấp $p$ (là một số nguyên tố) và phép toán nhóm $+$, khi đó $G$ là một phần tử sinh:

$$
G = G(q, +) \in \mathbb{G}
$$

> **📝 Nhắc lại**
>
> Một nhóm Abel hữu hạn sinh là một nhóm Abel mà có thể được tạo ra bằng cách sử dụng một số hữu hạn các phần tử.
>
> Cụ thể, tồn tại một tập hữu hạn các phần tử $G = \{g_1, g_2, \ldots, g_n\}$ trong nhóm $\mathbb{G}$ sao cho mọi phần tử $\alpha$ trong $\mathbb{G}$ có thể biểu diễn được dưới dạng [Linear Combination](https://en.wikipedia.org/wiki/Linear_combination) (Tổ hợp Tuyến tính) của các phần tử trong tập này:
>
> $$
> \alpha = k_1g_1 + k_2g_2 + \ldots + k_ng_n \enspace \text{với} \enspace
> \begin{cases}
>     k_1, k_2, \ldots, k_n \in \mathbb{Z} \\
>     \alpha \in \mathbb{G}
> \end{cases}
> $$
>
> Cấp của nhóm là số lượng các phần tử trong tập $G$, nó là một số nguyên tố, và phép toán của nhóm phải là phép toán giao hoán (cộng hoặc nhân).

Khi đó, tồn tại ánh xạ $\mathcal{M}$ chiếu từ các lá bài sang các phần tử sinh của $\mathbb{G}$. Cho trước một lá bài $d$, có thể tính được $M = \mathcal{M}(d)$ là một phần tử sinh của $\mathbb{G}$.

$$
\mathcal{M}: P \rightarrow \mathbb{G} \enspace \text{với} \enspace
\begin{cases}
    \mathcal{M}(d) \in \mathbb{G} \\
    \mathcal{M}(d) = \mathcal{M}(d') \Leftrightarrow d = d'
\end{cases}
$$

Với cấp số $p$, ta có tập $\mathbb{Z}_p$ là một [Multiplicative Group of Integers Modulo](https://en.wikipedia.org/wiki/Multiplicative_groud_of_integers_modulo_n) (Nhóm Nhân của Số Nguyên Modulo) với module là $p$, do đó đảm bảo mọi giá trị trong tập này thuộc $\{1, 2, \ldots, p-1\}$.

### Quy trình

#### Tạo khóa

Mỗi người chơi $i$ sẽ tạo cho mình một secret key $sk_i \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{Z}_{q}$, từ đó tính được public key $pk_i = sk_i \cdot G$.

Để ngăn chặn việc người chơi cố tình sử dụng các khóa công khai giả mạo nhằm đánh lừa hoặc phá vỡ hệ thống trò chơi, các người chơi cũng sẽ phải chứng minh được rằng họ thực sự có secret key tương ứng với public key của mình. Việc này có thể được thực hiện bằng cách sử dụng [Schnorr’s Identification Protocol](https://www.zkdocs.com/docs/zkdocs/zero-knowledge-protocols/schnorr/) (Giao thức Xác thực Schnorr).

Một khi đã có được các public key của tất cả các người chơi, chúng ta có thể tính được public key chung $P$ của tất cả mọi người:

$$
P = \sum_{i=1}^{l} pk_i = \sum_{i=1}^{l} sk_iG
$$

#### Mã hóa lá bài

Mã hóa toàn bộ các lá bài bằng cách sử dụng một **hàm mã hóa** $\varepsilon$ lên từng lá bài, thực tế hàm này là một [Mã hóa ElGamal](https://en.wikipedia.org/wiki/ElGamal_encryption). Lá bài $M \in \mathbb{G}$ sẽ được mã hóa thành $C \in \mathbb{G} \times \mathbb{G}$ theo công thức sau:

$$
C = \varepsilon_P(M) = \begin{pmatrix}
    C_1 \\
    C_2
\end{pmatrix} = \begin{pmatrix}
    rG \\
    M + rP
\end{pmatrix} \enspace \text{với} \enspace r \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{Z}_{q}
$$

$r$ là một số ngẫu nhiên bí mật được tạo ra bởi người chơi đó để mã hóa lá bài.

#### Mã hóa đè lá bài

Lá bài có thể đuọc mã hóa lần nữa thông qua một **hàm mã hóa đè** $\varepsilon'$, hàm này sẽ được sử dụng để mã hóa lá bài $C$ thành $C'$:

$$
C' = \varepsilon'(P, C) = \begin{pmatrix}
    C'_1 \\
    C'_2
\end{pmatrix} = C + \begin{pmatrix}
    r'G \\
    r'P
\end{pmatrix} = \begin{pmatrix}
    C_1 + r'G \\
    C_2 + r'P
\end{pmatrix} \enspace \text{với} \enspace r' \overset{{\scriptscriptstyle \operatorname{R}}}{\leftarrow}\mathbb{Z}_{q}
$$

#### Giải mã lá bài

Qua các công thức trên, ta có thể thấy một lá bài được mã hóa
$C = \begin{pmatrix}
C_1 \\
C_2
\end{pmatrix}$
gồm hai thành phần $C_1$ và $C_2$ và chúng có cùng hệ số $r$. Để giải mã lá bài được mã hóa $C$, người chơi $i$ cần sử dụng secret key $sk_i$ của mình để tính giá trị $D = sk_i \cdot C_1$, tập hợp các giá trị $D$ từ những người đã mã hóa lá bài bài sẽ giải mã được lá bài $C$:

$$
M = C_2 - \sum_{i=1}^{l} D_i
$$

Ta có thể chứng minh được công thức trên như sau:

$$
\begin{aligned}
    C_2 - \sum_{i=1}^{l} D_i &= C_2 - \sum_{i=1}^{l} sk_iC_1 \\
    &= (M + rP) - \sum_{i=1}^{l} sk_i(rG) \\
    &= M + rP - r\sum_{i=1}^{l} sk_iG \\
    &= M + rP - rP \\
    &= M
\end{aligned}
$$
