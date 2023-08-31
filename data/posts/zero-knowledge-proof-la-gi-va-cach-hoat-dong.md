---
title: Zero-Knowledge Proof là gì và cách hoạt động
date: '2023-08-29'
tags: ['ZKP', 'Blockchain', 'Cryptography']
draft: false
summary: Zero-Knowledge Proof là một công nghệ Cryptography đang được nhiều người quan tâm trong thời gian gần đây nhờ vào Blockchain, bài viết này sẽ giới thiệu cho chúng ta cái nhìn tổng quát về công nghệ này.
layout: PostView
thumbnail: '/static/images/thumbnails/zero-knowledge-proof-la-gi-va-cach-hoat-dong.png'
---

_Ngày nay, chúng ta đã chứng kiến nhiều tiến bộ đã thay đổi cuộc sống hàng ngày cũng như hoạt động kinh doanh. Chúng ta được kết nối hơn bao giờ hết với nhiều thiết bị trong tay, cho phép thực hiện giao dịch tài chính, chia sẻ thông tin cá nhân và mua sản phẩm, dịch vụ._

_Tuy nhiên, người dùng ngày càng phải đối mặt với các vấn đề liên quan đến việc sử dụng dữ liệu độc hại cùng việc đảm bảo tính bảo mật cao hơn. Vậy, ví dụ về Zero-Knowledge Proof có vai trò gì trong bối cảnh vấn đề an ninh thông tin và quyền riêng tư hiện đại? Độc giả có thể khám phá hai loại ví dụ khác nhau để thể hiện zero-knowledge proof một cách tốt._

<img src='/static/images/thumbnails/zero-knowledge-proof-la-gi-va-cach-hoat-dong.png' alt="Zero-Knowledge Proof là gì và cách hoạt động" />

## Khái niệm về Zero-Knowledge Proof

**Zero-knowledge Proof** (Bằng chứng về Kiến thức Mật) hoặc **ZKP** là một phương pháp hay giao thức trong Cryptography (Mật mã học),
và được giới thiệu lần đầu tiên vào năm 1985 bởi Shafi Goldwasser, Silvio Micali, và Charles Rackoff.

ZKP hoạt động dựa trên phương pháp là một bên **Prover** (Người chứng minh) chứng minh với bên **Verifier** (Người xác minh) rằng một thông tin (tuyên bố, mệnh đề,...) là đúng hoặc sai mà không cần phải tiết lộ bất kỳ thông tin nào khác.

Có thể hiểu đơn giản là, khi chúng ta bị yêu cầu chứng minh rằng mình đã làm một điều gì đó, chẳng hạn như giải một bài toán.
Thông thường, ta có thể sẽ phải giải lại toàn bộ bài toán đó dưới sự giám sát của người yêu cầu.
Tuy nhiên, với ZKP, chúng ta có thể chứng minh rằng mình đã giải nó mà không cần phải thực hiện lại việc này cũng như không tiết lộ bất kỳ thông tin nào về cách giải.

Bối cảnh trên là một ứng dụng điển hình mà ZKP hoạt động xoay quanh.
Nó giải quyết nhiều vấn đề về bảo mật và mở ra nhiều cách triển khai hiện đại và cách mạnh mẽ.
Bên cạnh đó, ZKP cũng giải phóng rất nhiều sức mạnh cho các ứng dụng Blockchain, nơi mà tất cả mọi thứ đều được thực hiện công khai và minh bạch.

## Các ví dụ kinh điển về Zero-Knowledge Proof

### Bài toán hang Ali Baba

Đây là một ví dụ nổi tiếng trong một bài báo có tiêu đề _Cách để giải thích Zero-Knowledge cho con bạn_, với Alice là Prover và Bob là Verifier.

#### Bối cảnh bài toán hang Ali Baba

Alice và Bob đã bắt gặp được một bài toán khó trong một cuộc phiêu lưu, đó là mở "cánh cửa thần kỳ" trong hang động Ali Baba.
Hang có hình dạng giống như một chiếc vòng, hai bên là hai lối vào/ra với một cửa thần nằm khuất bên trong.
Nhưng để mở được nó, họ cần phải biết một cụm từ bí mật.

Alice đã khám phá ra từ bí mật dùng để mở cánh cửa thần này,
và muốn chứng minh cho Bob rằng _"Alice biết cụm từ bí mật"_ mà không phải tiết lộ cho anh ta cụm từ đó là gì.

Quy ước rằng các con đường bên trái và bên phải từ lối vào được gọi là $A$ và $B$.

> - **Chứng minh**: Mệnh đề _"Alice biết cụm từ bí mật"_ là đúng.
> - **Prover**: Alice
> - **Verifier**: Bob

#### Quá trình chứng minh bài toán hang Ali Baba

<figure>
<img
    className="w-full md:w-1/2"
    src="/static/images/posts/zkp_alibaba1.png"
    alt="Ví dụ về Hang Ali Baba"
/>
<figcaption>Source: wikipedia.com</figcaption>
</figure>

Đầu tiên, Bob đợi bên ngoài hang còn Alice đi vào lối $A$ hoặc $B$, được chọn ngẫu nhiên, nhưng Bob không được phép xem cô ấy chọn đi lối nào.
Sau đó, Bob gọi tên con đường mà anh muốn cô đi ra, $A$ hoặc $B$.

<figure>
<img
    className="w-full md:w-1/2"
    src="/static/images/posts/zkp_alibaba2.png"
    alt="Ví dụ về Hang Ali Baba"
/>
<figcaption>Source: wikipedia.com</figcaption>
</figure>

Và thật đơn giản, Alice chỉ cần đi ra lối mà Bob yêu cầu, hoặc mở cửa thần nếu cần đi ra từ lối bên kia.

<figure>
<img
    className="w-full md:w-1/2"
    src="/static/images/posts/zkp_alibaba3.png"
    alt="Ví dụ về Hang Ali Baba"
/>
<figcaption>Source: wikipedia.com</figcaption>
</figure>

#### Kết luận bài toán hang Ali Baba

Xác suất cho chứng minh của Alice là sai lên đến 50%. Tuy nhiên, chỉ cần lặp lại việc này thêm nhiều lần, xác suất này sẽ giảm còn rất thấp.

Cụ thể sau 20 lần thử:

$$
\begin{aligned}
P(\text{Alice chứng minh sai}) &= (1/2)^{20} \\
&\approx 9.536 \times 10^{-7}
\end{aligned}
$$

Hoặc cách khác, chỉ cần Alice đi vào hang từ lối A và đi ra từ lối B, chắc chắn việc Alice có cụm từ bí mật là đúng mà vẫn đảm bảo Bob không biết được cụm từ đó là gì.

### Bài toán màu sắc

#### Bối cảnh bài toán màu sắc

Anh bạn Bob là một người mù màu, còn Alice thì không. Và trên tay Bob có hai quả bóng giống nhau về hình dáng nhưng khác màu.

Vấn đề là Bob không thể xác định được chúng có hoàn toàn giống hệt nhau hay có sự khác nhau về màu sắc.
Trong khi Alice luôn không muốn để Bob biết được màu sắc của chúng vì một lí do nào đó, và chỉ cho anh ấy biết rằng chúng khác màu.

Vì vậy Bob muốn Alice giúp anh ta kèm theo một khoảng thù lao.
Nhưng để khoảng thù lao trên không bị lãng phí trong trường hợp Alice ranh mãnh lừa dối anh ấy,
Bob yêu cầu rằng Alice phải chứng minh cho Bob một cách thuyết phục.

> - **Chứng minh**: Mệnh đề _"Hai trái bóng khác màu"_ là đúng.
> - **Prover**: Alice
> - **Verifier**: Bob

#### Quá trình chứng minh bài toán màu sắc

Đầu tiên, Bob đưa cho Alice xem một trong hai quả bóng.
Sau đó, anh ấy thu hồi lại, đặt nó sau lưng, nhưng Bob có xáo trộn chúng hay không thì Alice không thể biết được.
Cuối cùng, Bob đưa cho Alice một quả bóng khác,
và yêu cầu cô phải xác định xem quả bóng này có giống với quả bóng mà anh ta đã cho cô ấy xem trước đó hay không.

Tất nhiên Alice không bị mù màu nên cô ấy có thể phân biệt được hai quả bóng đó.
Nếu Bob không tráo, Alice có thể xác định rằng đó là quả bóng cũ.
Và nếu Bob đã tráo, Alice có thể xác định rằng đó là quả bóng mới.

#### Kết luận bài toán màu sắc

Một khi Alice trả lời rằng đó quả bóng cũ trong khi Bob đã tráo hoặc ngược lại,
Bob sẽ biết được hai quả bóng đó hoàn toàn giống nhau và Alice đã cố gắng lừa anh ta.
Thực tế, giống như ví dụ trước, xác suất này là 50%.
Tuy nhiên, chỉ cần lặp lại thêm nhiêu lần nữa và Alice toàn đúng, Bob có thể tin tưởng vào khẳng định của Alice.

Chứng minh trên là Zero-Knowledge, vì trước và sau khi xác minh, Bob vẫn không thể biết được chúng màu gì.
Hay nói cách khác, anh ta mãi mãi sẽ "không có kiến thức" (không biết được) về màu sắc và cách phân biệt hai quả bóng.

### Bài toán túi socola bí mật

#### Bối cảnh bài toán túi socola bí mật

Cả Alice và Bob đều được tặng một túi socola trong ngày Halloween, nhưng vấn đề là cả hai muốn biết rằng liệu các túi đó có cùng số lượng socola hay không.
Tuy nhiên, cả hai đều không muốn nói ra có bao nhiêu thanh socola mà mình có vì họ không muốn chia đều số socola này cho nhau.

Bây giờ, chúng ta đặt giả định rằng, số lượng socola trong túi nằm trong khoảng từ 1 đến 4.

> - **Chứng minh**: Mệnh đề _"Alice và Bob có cùng số lượng socola"_ là đúng (hoặc ngược lại).
> - **Prover**: Alice và Bob
> - **Verifier**: Alice và Bob

#### Quá trình chứng minh bài toán túi socola bí mật

Bob mang theo bốn hộp đã khóa được gắn nhãn tương ứng từ 1 đến 4 vào trong một căn phòng.
Sau đó, ném các chìa khóa đi và chỉ giữ lại một chìa khoá tương ứng với hộp có nhãn là số lượng socola của anh ấy.
Hành động này có thể được thực hiện dưới sự giám sát của Alice để đảm bảo tính trung thực. Sau đó Bob rời khỏi phòng.

Còn phía Alice, cô đã chuẩn bị 4 tờ giấy khác nhau, gồm 3 tờ giấy có dấu trừ $(-)$ và 1 tờ giấy có dấu cộng $(+)$.
Sau đó, Alice cũng có cho mình các chìa khóa của riêng mình để mở hộp.
Cô đặt tờ giấy có dấu $(+)$ vào hộp có nhãn là số lượng socola mà mình đã nhận được, các hộp còn lại được đặt các tờ giấy có dấu trừ $(-)$ vào.

Bước cuối cùng, Alice rời đi, Bob đến phòng và mở hộp tương ứng với chìa khóa duy nhất của mình.

#### Kết luận bài toán túi socola bí mật

Lúc này anh ấy có thể kiểm tra liệu Alice có cùng số lượng socola không:

- Nếu trong hộp của Bob là một tờ giấy có dấu cộng, thì anh ấy biết rằng Alice cũng có cùng số lượng socola.
- Nhưng nếu Bob thấy tờ giấy có dấu trừ? Điều này có nghĩa là anh ấy chỉ biết rằng mình không có cùng số lượng socola với Alice.

Khi Alice trở lại phòng, Bob sẽ đưa cho Alice tờ giấy mà mình lấy được.
Khi đó, Alice cũng có thể xác định được rằng cả hai có cùng số lượng socola hay không.
Tuy nhiên, không một ai trong số họ có thể biết được liệu người kia có nhiều hoặc ít socola hơn.

### Kết luận

Trong cả 3 ví dụ trên, vẫn sẽ tồn tại khả năng Alice lừa Bob.

Cụ thể hơn, trong ví dụ 3, Alice có thể đặt tờ giấy vào hộp có nhãn **không phải** là số lượng socola mà cô ấy nhận được.

Lúc này Verifier là Bob sẽ bị lừa nhưng bản thân Alice cũng là Verifier và sẽ không thể biết được số lượng socola của nhau.
Có nghĩa là, cả Alice và Bob đều không có động cơ nào để làm điều này vì họ đều muốn xác minh liệu khẳng định đó đúng hay sai.

Mặt khác, Prover sẽ luôn muốn chứng minh rằng khẳng định của mình là đúng và Verifier sẽ luôn muốn chứng minh rằng khẳng định của Prover là sai đến khi hoàn toàn bị thuyết phục.

## Chi tiết về Zero-Knowledge Proof

### Đặc điểm

Zero-Knowledge Proof có 3 đặc điểm để xác định bao gồm:

#### Completeness

**Completeness** (Tính trọn vẹn) cho biết rằng nếu một khẳng định đúng, một Verifier trung thực sẽ bị thuyết phục bởi một Prover trung thực.

Cụ thể hơn, Prover có thể thực hiện một loạt các bước chứng minh mà không cần phải tiết lộ bất kỳ thông tin bổ sung nào ngoài việc khẳng định chính xác.

#### Soundness

**Soundness** (Tính đúng đắn) cho biết rằng nếu một khẳng định là sai, không có Prover gian lận nào có thể thuyết phục được một Verifier trung thực.

Điều này đảm bảo tính đáng tin cậy của quá trình chứng minh, và Verifier có thể yên tâm rằng họ không sẽ bị lừa dối bởi những chứng minh sai lầm.

#### Zero-Knowledge

**Zero-Knowledge** (Không có Kiến thức) cho biết rằng nếu một khẳng định là đúng, không có Verifier gian lận nào có thể học được bất kỳ thông tin bổ sung nào về khẳng định đó.

Điều này đảm bảo tính riêng tư của quá trình chứng minh, và Prover có thể yên tâm rằng họ không sẽ bị tiết lộ bất kỳ thông tin nào về khẳng định đó.

### Ưu nhược điểm của Zero-Knowledge Proof

#### Ưu điểm

- **Quyền riêng tư và bảo mật**: ZKP đảm bảo quyền riêng tư cũng như giữ bí mật thông tin dữ liệu người dùng khi chỉ thực hiện nhiệm vụ xác nhận tính đầy đủ và hợp lý của tuyên bố mà không cần người dùng phải cung cấp thêm thông tin khác.
  Vậy nên, ZKP ngoài việc dùng trong layer 2 để mở rộng còn được dùng trong các ứng dụng về riêng tư và bảo mật như: Monero, Tornado Cash,...
- **Nhiều khả năng ứng dụng**: ZkSync, StarkNET, Loopring là các ví dụ tiêu biểu cho việc sử dụng ZKP để tăng thông lượng và tăng khả năng mở rộng cho các mạng Blockchain.
  Ngoài ra nó còn được sử dụng trong các ứng dụng khác như chia sẻ dữ liệu, nhắn tin bảo mật, chứng thực,...

#### Nhược điểm

- **Quá trình tính toán phức tạp**: ZKP là một giao thức được hình thành từ rất nhiều những thuật toán có mức độ phức tạp cao, do đó nó đòi hỏi một giải thuật phức tạp cùng lượng lớn các phép tính. Vì vậy, các hệ thống máy tính phổ thông với cấu hình thấp sẽ gặp không ít trở ngại khi tham gia quá trình xác thực.
- **Không thân thiện với developer**: Nhiều thống kê cho cho thấy điểm trừ của ZKP này là không thân thiện với developer. Điều này có thể là do ZKP là một công nghệ mới, nên nó cần thời gian để các developer có thể hiểu và sử dụng nó một cách hiệu quả.

### Ứng dụng của Zero-Knowledge Proof

#### Hệ thống xác thực

Các nghiên cứu về ZKP đã được thúc đẩy bởi các hệ thống xác thực, trong đó một bên muốn chứng minh danh tính của mình cho bên thứ hai thông qua một số thông tin bí mật (chẳng hạn như mật khẩu), nhưng không muốn bên thứ hai biết bất cứ điều gì về bí mật này.

Tuy nhiên, mật khẩu thường quá nhỏ hoặc không đủ ngẫu nhiên để được sử dụng trong nhiều chương trình thực hiện ZKP.
Zero-Knowledge Password Proof (Bằng chứng về Mật Khẩu), hay ZKPP, là một loại ZKP đặc biệt nhằm giải quyết kích thước giới hạn của mật khẩu.

Cloudflare, một công ty bảo mật và cơ sở hạ tầng web của Mỹ đã quyết định sử dụng [Sigma Protocol](https://en.wikipedia.org/wiki/Proof_of_knowledge#Sigma_protocols) để xác minh web riêng tư bằng phần cứng của nhà cung cấp.

#### Hành vi đạo đức

Một trong những ứng dụng của ZKP là thực thi hành vi trung thực trong khi vẫn duy trì quyền riêng tư.

Nói một cách đại khái, ý tưởng là buộc người dùng phải chứng minh bằng cách sử dụng ZKP rằng hành vi của họ là đúng (trên giao thức của no).
Vì tính **Soundness**, người dùng phải thực sự hành động trung thực mới có thể đưa ra bằng chứng xác đáng.
Và vì tính **Zero-Knowledge**, người dùng không được xâm phạm quyền riêng tư về bí mật trong quá trình cung cấp bằng chứng.

Flow Blockchain đã triển khai [SPocK](https://flow.com/technical-paper) (Specialized Proof of Confidential Knowledge) để đảm bảo tính trung thực của các node Execution và Verification trong mạng.

> Đọc thêm về SPoCK tại bài viết [này](https://blog-snowyfield.vercel.app/posts/flow-top-blockchain-danh-cho-nft#spock).

#### Học máy và trí tuệ nhân tạo

Khi train model (đào tạo mô hình học máy), người ta thường dùng các dữ liệu có sẵn, trong khi một số dữ liệu có thể chứa các thông tin nhạy cảm, hoặc đơn giản là người chia sẻ thông tin không muốn người khác biết về các dữ liệu này.

ZKP có thể được ứng dụng để train model trên dữ liệu riêng tư mà không tiết lộ dữ liệu đó cho người tạo hoặc người dùng model.
Điều này cho phép phát triển các mô hình có thể được sử dụng trong các ngành nhạy cảm hoặc được quản lý như chăm sóc sức khỏe hoặc tài chính mà không ảnh hưởng đến quyền riêng tư của những cá nhân có dữ liệu được sử dụng.

Ngoài việc đảm bảo quyền riêng tư, phương pháp này còn có giúp xác minh và bảo vệ tính toàn vẹn của các model.

Zkonduit đã triển khai [EZKL](https://docs.ezkl.xyz/) (Easy Zero-Knowledge Learning) để train model học máy trên dữ liệu riêng tư.

Có một phương pháp train model chống gian lận và đảm bảo tính riêng tư của dữ liệu là **Federeated Learning** (Học tập Liên kết) triển khai trên Blockchain.

#### Blokchain

Có thể nói ZKP là một trong những ứng dụng mạnh mẽ nhất của Blockchain khi nó đóng góp rất nhiều cơ chế quan trọng từ hệ thống bên trong cho đến các ứng dụng bên ngoài.

Đã từng có một dự án là **Tornado Cash** được xây dựng trên Ethereum, cho phép người dùng gửi ETH vào hệ thống và nhận lại ETH ở một địa chỉ khác.
Nó hoạt động bằng cách xáo trộn các thông tin trên Blockchain và điều này có thể giúp các tội phạm rửa tiền mà không có cách nào để truy vết.
Cụ thể đã có một trường hợp rửa tiền lên đến 7 tỷ USD thông qua giao thức này.

Hiện Tornado Cash đã bị cấm ở vài quốc gia và developer cũng đã bị bắt giữ.

### Các giao thức của Zero-Knowledge Proof

2 giao thức ZKP được quan tâm nhất trên thị trường hiện nay là zk-SNARK và zk-STARK.

<img
  className="w-full md:w-1/2"
  src="/static/images/posts/snark-vs-stark.png"
  alt="zk-SNARK vs zk-STARK"
/>

#### zk-SNARK

**zk-SNARK** (Succinct Non-interactive Argument of Knowledge) lần đầu tiên được đề xuất vào năm 2012 và được triển khai ngay sau đó. Trong đó:

- **Succinct** (Ngắn gọn): Có nghĩa là thời gian để xác minh quy mô đa logarit

- **Non-interactive** (Không Tương tác): Cho thấy rằng hệ thống chứng minh không thể cho phép bất kỳ tương tác nào nữa sau giai đoạn xử lý trước, có thể bao gồm “toxic waste” và cần thời gian tuyến tính để tạo.

#### zk-STARK

**zk-STARK** (Scalable Transparent Argument of Knowledge) là công nghệ tương đối mới hơn. Được nhóm StarkWare giới thiệu vào năm 2018, zk-STARK có 2 ưu điểm chính:

- **Transparent** (Minh bạch): Hệ thống hoạt động mà không cần thiết lập đáng tin cậy, tức là nó loại bỏ “toxic waste”, điều mà được cho phép bởi zk-SNARKs
- **Scalable** (Khả năng mở rộng): Chúng có khả năng mở rộng hơn về tốc độ và kích thước tính toán khi chứng minh quy mô thời gian bán tuyến tính và quan trọng là xác minh tổng số + thời gian tiền xử lý sẽ chia tỷ lệ đa logarit

Tuy nhiên, STARK có kích thước bằng chứng lớn hơn nhiều so với SNARK. Ngoài ra, Ethereum có một trình biên dịch cho các SNARK cụ thể và đối với các SNARK đó, chi phí gas để xác minh bằng chứng thấp hơn so với bằng chứng STARK.
