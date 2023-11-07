---
title: Lập trình hướng tài nguyên cùng Cadence
date: '2023-09-12'
tags: ['Cadence', 'Blockchain', 'Tutorial']
draft: true
summary: Tìm hiểu qua phương pháp lập trình hướng tài nguyên với Cadence bằng một project NFT đơn giản
layout: PostView
thumbnail: '/static/images/thumbnails/lap-trinh-huong-resource-cung-cadence.png'
---

_Khi nói đến các phương pháp lập trình, người ta thường nghĩ ngay đến Object-Oriented Programming và Functional Programming. Tuy nhiên hiện nay có rất nhiều phương pháp lập trình khác nhau, mỗi phương pháp đều có những ưu điểm và nhược điểm riêng. Và hầu hết các phương pháp này đều ra đời từ khá lâu vể trước. Bài viết này sẽ giới thiệu một phương pháp lập trình vừa mới ra đời gần đây đó là lập trình hướng tài nguyên kèm theo một ví dụ cơ bản bằng Cadence._

_**Ý kiến chủ quan**: Cá nhân mình thực sự không thích cách gọi "phương pháp lập trình" mà thay vào đó nên là **Programming Paradigm/Model** (Mô hình Lập trình). Bởi vì cụm từ "Phương pháp" (Methodology) thiên về một cách tiếp cận tổng thể, còn "Mô hình" (Paradigm) thiên về một tập hợp các quy tắc và cách đánh giá một chương trình. Vì vậy, mô hình lập trình được xem xét dựa trên cả cách lập trình và cách sử dụng chương trình. Trong khi cụm từ "Phương pháp" mang tính chủ quan trong việc lập trình và không thể hiện cách sử dụng chương trình._

<img src='/static/images/thumbnails/lap-trinh-huong-tai-nguyen-cung-cadence.png' alt="Lập trình hướng tài nguyên cùng Cadence" />

Khuyến nghị đọc trước [Flow - Top Blockchain dành cho NFT](https://snowyfield.software/posts/flow-top-blockchain-danh-cho-nft) để sẵn sàng trước khi đi vào bài viết này.

## Tổng quan

Các **Programming Paradigm** thường được chia thành 2 loại chính, đó là **Imperative Programming** và **Declarative Programming**.

### Imperative Programming

**Imperative Programming** (Lập trình Mệnh lệnh) là một mô hình lập trình mà trong đó chương trình được viết dưới dạng một tập hợp các câu lệnh (statement) với mong muốn thay đổi trạng thái của chương trình. Nói cách khác, developer sẽ hướng dẫn máy cách thay đổi trạng thái của chương trình.

Imperative Programming thường được chia thành 2 loại chính, đó là **Procedural Programming** (Lập trình Thủ tục) và **Object-Oriented Programming** (Lập trình Hướng Đối tượng).

Ví dụ trong OOP, chương trình được tổ chức dưới dạng các attribute (thuộc tính) và method (phương thức) trong các object (dối tượng). Người sử dụng sẽ gọi các method với mong muốn thay đổi attribute của object đó.

### Declarative Programming

**Declarative Programming** (Lập trình Khai báo) là một mô hình lập trình mà trong đó chương trình được viết dưới dạng một tập hợp các khai báo (declaration) để mô tả trạng thái của chương trình.

Một Declarative Programming phổ biến là **Functional Programming** (Lập trình Hàm), khi mà chương trình được viết dưới dạng một tập hợp các hàm (function) để mô tả trạng thái của chương trình. Người sử dụng chỉ cần gọi các hàm này để thực hiện các thao tác trên chương trình mà không cần quan tâm đến cách thức và ảnh hưởng của các hàm này đến chương trình. Functional Programming sử dụng nhiều recursion (đệ quy) và callback (gọi lại).

Ví dụ trong Functional Programming, chương trình được tổ chức dưới dạng các hàm. Người sử dụng sẽ gọi các hàm với mong muốn nhận được các kết quả tương ứng và không quan tâm đến việc nó gây ra sự thay đổi về các giá trị bên trong.

## Giải thích về Resource-Oriented Programming

Để hiểu đơn giản, chúng ta sẽ đến với một ví dụ về một khu chợ.

### Đối với kiểu OOP (Ledger)

Chương trình sẽ được tổ chức theo kiểu **Ledger** (Sổ cái), khi tất cả mọi mặt hàng đều được lưu trữ trong một **Kho Lưu Trữ Trung Tâm** (là một Smart Contract).

Khi thực hiện bán hàng, chúng ta phải đi đến **Kho Lưu Trữ Trung Tâm** và giao nộp mặt hàng cho kho.

Khi thực hiện mua hàng, chúng ta phải đi đến **Kho Lưu Trữ Trung Tâm** và trả tiền để yêu cầu thay đổi thông tin về người sở hữu của mặt hàng.
Số tiền này sẽ được chủ kho chuyển lại cho chủ sở hữu trước của mặt hàng đó.

Khi thực hiện thay đổi thông tin, chúng ta cũng sẽ phải đi đến **Kho Lưu Trữ Trung Tâm**.
Sau khi xác nhận số căn cước công dân của mình khớp với thông tin về người sở hữu được in trên mặt hàng đó, chúng ta mới có thể thực hiện thay đổi thông tin.

Giả sử nếu kho bị cháy, tất cả mọi mặt hàng mà chúng ta đang bán sẽ bị mất mà không được đền bù.
Hay nếu có ai đó lẻn vào **Kho Lưu Trữ Trung Tâm** và thay đổi các thông tin như thông tin về người sở hữu hoặc các mặt hàng, chúng ta cũng sẽ không thể làm gì được.

### Đối với kiểu ROP

Vẫn sẽ có một **Kho Lưu Trữ Trung Tâm** nhưng nó chỉ lưu trữ quy trình mua bán.

Khi thực hiện bán hàng, chúng ta không phải giao nộp mặt hàng cho kho mà chỉ cần điền các thông tin về mặt hàng cũng như bản thân.
Đồng thời **Cấp quyền: Truy cập vào thông tin mặt hàng** cho tất cả mọi người, **Cấp quyền: Lấy mặt hàng đi bất cứ lúc nào** cho chủ kho, và **Cấp quyền: Xem số tài khoản ngân hàng** cho chủ kho hoặc mọi người

Khi thực hiện mua hàng, chúng ta sẽ chuyển tiền trực tiếp cho chủ sở hữu và nhận về hàng hóa, hàng hóa này sẽ ở trong nhà của chúng ta.

Khi thực hiện thay đổi thông tin, vì chúng ta vẫn sở hữu nó trên tay, nên sẽ chỉ cần thực thay đổi lên chính mặt hàng đó mà không cần thông qua **Kho Lưu Trữ Trung Tâm**.

Giả sử nếu kho bị cháy, chúng ta vẫn sẽ không bị bất ảnh hưởng gì.
Và cũng sẽ không ai có thể lén thay đổi thông tin của một thứ đang nằm trên tay chúng ta.

Và tất nhiên, chúng ta hoàn toàn có thể hủy các quyền nếu không muốn bán nữa hoặc tặng hoàn toàn cho một ai đó mà không cần thông qua **Kho Lưu Trữ Trung Tâm**.

### Phân quyền

Vì Resource về cơ bản là một Object, cho nên nó cũng chứa các function (hàm). Vì thế Resource ngoài việc dùng để đại diện cho một Digital Asset, nó còn có thể được sử dụng như một "tấm vé" để thực hiện một số hành động được hạn chế. Hay nói cách khác, Resource có tính phân quyền.

Ví dụ, đối với khu chợ, chúng ta sẽ nâng cấp lên thành một nơi với nhiều người cho thuê sạp (diện tích) để bán hàng. Khi đó sẽ có 4 cấp độ là: **Chủ khu chợ**, các **Chủ sạp**, các **Người buôn** và cuối cùng là **Khách hàng**.

Mỗi người sẽ có một số quyền hạn - Capability cho các thao tác - function khác nhau, mà khi đó, các function sẽ được lưu trong Resource (ví dụ: chỉ **Người buôn** mới có quyền quản lí và truy cập thông tin các **Khách hàng** của mình).
Để thực hiện một hành động, chúng ta sẽ lấy Resource ra và gọi đến function tương ứng. Do đó nếu không có Resource đó, chúng ta sẽ không thể thực hiện được hành động đó.
Và các resource này (nên) được cung cấp bởi một số điều kiện nhất định (ví dụ: chỉ khi thuê một sạp mới có thể trở thành **Người buôn**).

### Reference và các quyền

Khác với Phân quyền, thứ yêu cầu phải có Resource đó trên tay và sử dụng nó, tất cả mọi người có thể "mượn" Reference (Tham chiếu).

Reference có thể hiểu như là một hình thức "mượn" một Resource rồi "photocoppy" nó ra thành một "bản sao".
Khác với "bản chính", thứ bạn có thể tùy ý thao tác lên nó, "bản sao" chỉ cho phép bạn chỉ được thực hiện một số thao tác đã được quy định trước đó.
Các thao tác này vẫn có thể ảnh hưởng đến "bản chính".

Để hiểu rõ hơn, các quyền này có thể được cấp cho **Tất cả mọi người** (Public) hoặc **Chỉ một số người** (Private) tùy ý bởi chủ sở hữu của Resource đó:

- Đối với các quyền được đặt là Public, chúng ta có thể tự do "mượn" bằng cách truy cập vào tài khoản của chủ sở hữu.
- Đói với các quyền được đặt là Private, chúng ta buộc phải có một "bản sao" của Resource đó.
  Chúng ta có thể có được bản sao bằng cách trực tiếp xin từ chủ sở hữu, hay làm cách nào đó để có nó trên tay rồi lén "photocopy".

Như vậy, quay lại ví dụ trước, với một Resource là mặt hàng, chúng ta có thể chia thành các quyền như: **Truy cập vào thông tin mặt hàng** (Public) hay **Lấy mặt hàng đi bất cứ lúc nào** (Private).

Ngoài ra, chúng ta có thể có các quyền khác cho Resource mặt hàng như:

- Quyền xem nó (biết được màu sắc, hình dáng,...)
- Quyền chụp ảnh / photocopy nó (tạo ra một bản sao với những chức năng được cho phép)
- Quyền thay đổi nó (lấy đi hay thay đổi một vài linh kiện)
- Quyền sử dụng nó (thực hiện các thao tác mà nó cung cấp)
- Quyền xóa nỏ (chỉ người sở hữu - người có nó trên tay mới có thể làm điều này)

### ROP là Imperative Programming hay Declarative Programming?

Khi nghe đến Resource-Oriented Programming, nhiều người sẽ nghĩ đến Imperative Programming vì cái tên "Resource-Oriented Programming" giống với "Object-Oriented Programming", và các Resource cũng chính là các Object với một số quy định đặc biệt.

Nhưng thực tế cách tổ chức và sử dụng chương trình là hoàn toàn khác (như ví dụ trên). Đặc biệt, chúng ta sử dụng các Resource thông qua hệ thống Capability chứ không sử dụng trực tiếp như trong OOP.

Vì vậy nó chính là **Declarative Programming** bởi vì chúng ta sử dụng chương trình như cách chúng ta tương tác với đồ vật để phục vụ một mục đích cụ thể.

## Cài đặt Cadence
