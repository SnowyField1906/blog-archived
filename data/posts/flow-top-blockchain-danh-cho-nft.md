---
title: Flow - Top Blockchain dành cho NFT
date: '2023-08-16'
tags: ['Flow', 'NFT', 'Blockchain']
draft: false
summary: Trong bài viết này chúng ta sẽ tìm hiểu về Flow - một Blockchain mới nhưng đã có rất nhiều thành công trong việc hỗ trợ cho các ứng dụng NFT và GameFi.
layout: PostView
thumbnail: '/static/images/thumbnails/flow-top-blockchain-danh-cho-nft.png'
---

Trước khi NFT được biến đến rộng rãi vào năm 2021, thì vào năm 2017, CryptoKitties đã được khai sinh bởi DapperLabs và trở thành một trong những
dự án NFT đầu tiên. Hiện tượng này đã gây sốt trong một khoảng thời gian dài và phần còn lại là lịch sử. Với số lượng user đông đảo, "cuộc cách mạng" CryptoKitties
đã khiến cho Ethereum, Blockchain mà nó được xây dựng trên đó, trở nên tắc nghẽn và gây ra các vấn đề về tốc độ và phí transaction. Điều này
đã khiến cho DapperLabs có một ý tưởng về một Blockchain lý tưởng dành riêng cho NFT và các Digital Asset (Tài sản kỹ thuật số) khác. Sau đó Flow ra đời và toàn bộ
dự án CryptoKitties được chuyển sang đó.

## Tổng quan về Flow

### Flow là gì?

Flow là một Blockchain layer 1 (tương tự như Ethereum) được thiết kế đặc biệt để hỗ trợ cho các ứng dụng NFT và GameFi.
Vì là một **Non-EVM Blockchain** (Blockchain không tương thích với EVM), nên thiết kế của Flow rất đặt biệt và khác xa với Ethereum và các
Blockchain khác.

### Khác biệt giữa Flow và Ethereum

#### Nhanh chóng

Mặc dù đã chuyển sang Proof-of-Stake vào năm 2022 nhưng Ethereum vẫn còn rất chậm, cụ thể tốc độ xử lí block là khoảng 12 giây/block.
Trong khi đó, Flow có tốc độ xử lí block khoảng 2 giây/block

#### Phí transaction thấp

Phí transaction trên Ethereum là cực kì đắt khi nhu cầu sử dụng network cao và giá ETH rất đắt đỏ, trong khi đó phí transaction trên Flow chỉ dao động
từ 0.00001 đến 0.0001 USD.

#### Khả năng mở động cao

Sử dụng kiến trúc **Multi-role Node** (Node đa vai trò) thay vì **Sharding** (Phân đoạn), Flow có thể mở rộng network của mình một cách dễ dàng.

#### Thân thiện với người dùng

Tài khoản trên Flow được thiết kế thân thiện với người dùng hơn rất nhiều. Người dùng có thể quản lí các tài khoản con một cách dễ dàng.
Hiện nay Flow vừa ra mắt **Hybrid Custody** (Lưu ký đa phương thức), sự kết hợp giữa **Self-Custody** (Tự lưu ký) và **App-Custody** (Lưu ký trên ứng dụng).

#### Dễ quản lí tài sản

Các Smart Contract trên Flow được viết bằng Cadence, một ngôn ngữ **Resource-Oriented Programming** (Lâp trình hướng Tài nguyên),
Giúp cho việc quản lí tài sản và các quyền là vô cùng dễ dàng. Một ngôn ngữ ROP tương tự khác là Move của Diem/Libra (Blockchain được phát triển bởi Facebook).

#### Kiến trúc hiện đại

Flow được thiết kế với kiến trúc đặt người dùng và các Digital Asset - Resource làm trung tâm, giúp cho Flow có nhiều tiện lợi hơn khi sử dụng so với các
Blockchain khác.

## Chi tiết về các đặc điểm đặc biệt của Flow

### Multi-role Node

Vì thế Flow đã có một cách tiếp cận khác trong việc mở rộng network là triển khai kiến trúc **Multi-role Node** cho Blockchain của mình.
Trong đó các node sẽ được chia thành 4 loại, mỗi loại chỉ thực hiện một nhiệm vụ cụ thể và duy nhất.

#### Vấn đề với Sharding

Trong một network truyền thống, mỗi node sẽ phải lưu trữ trạng thái hoàn chỉnh của toàn bộ network cùng với xử lý tất các transaction trên chain.

Do đó, các giải pháp mở rộng network Blockchain thường tập trung vào việc giảm tải các transaction khỏi chain chính để giảm tải cho network,
và một trong những triển khai nổi tiếng nhất cho giải pháp này là **Sharding**.
Đây là hình thức chia transaction thành nhiều phần gọi là **Shard** (Phân đoạn), giúp giảm độ trễ của network.
Điều này có nghĩa là mỗi Shard trong một hệ thống như vậy chỉ chịu trách nhiệm xử lý một phần của khối lượng transaction tổng thể.

Để biết tại sao Sharding lại không phù hợp, chúng ta hãy đến với nguyên tắc **ACID** trong cơ sở dữ liệu, bao gồm:

- **Atomicity** (Tính nguyên tử): Điều này có nghĩa là mọi thay đổi về dữ liệu phải đảm bảo trọn vẹn.
  Một transaction có nhiều thao tác thì: Hoặc là tất cả các thao tác đều được thực hiện thành công, hoặc là tất cả các thao tác đều không được thực hiện.
  Hay nói cách khác, nếu xảy ra lỗi trong một thao tác thì tất cả mọi hành động ghi dữ liệu trước đó sẽ bị hủy.
- **Consistency** (Tính nhất quán): Dữ liệu trên chain sẽ luôn ở trạng thái hợp lệ.
  Có nghĩa là bất kì transaction nào xảy ra lỗi thì trạng thái dữ liệu sẽ phải được hoàn nguyên về trạng thái hợp lệ trước đó.
- **Isolation** (Tính độc lập): Một transaction đang thực thi và chưa được xác nhận phải bảo đảm tách biệt khỏi các transaction khác.
  Tính chất này đảm bảo rằng hai hoặc nhiều transaction không bao giờ được trộn lẫn với nhau, tạo ra dữ liệu không chính xác và không phù hợp.
- **Durability** (Tính bền vững): Dữ liệu phải được lưu lại sao cho ngay cả trong trường hợp hỏng hóc hoặc có lỗi hệ thống, dữ liệu vẫn được đảm bảo.
  Điều này có nghĩa là một transaction đã được xác nhận sẽ không bị mất dữ liệu.

Rõ ràng cơ chế trên đã đi ngược với nguyên tắc **Isolation** và cách triển khai cũng rất phức tạp.
Điều này cũng dẫn đến các lỗi không mong muốn trong việc tương tác giữa các Shard, gây ra độ trễ trên network và dễ bị tấn công.

#### Ưu điểm của Multi-role Node

Ưu điểm lớn nhất trong kiến trúc này là chúng ta có thể tách Consensus (Đồng thuận) và Execution (Thực thi) ra khỏi nhau.
Bởi vì một hành động trên chain sẽ nằm trong 2 loại:

- **Non-deterministic** (Không xác định hoặc Chủ quan): Chẳng hạn như xác định sự hiện diện của một transaction, xác định thứ tự của các transaction,...
- **Deterministic** (Xác định hoặc Khách quan): Chẳng hạn như thay đổi trạng thái của một tài khoản, thay đổi dữ liệu của một Digital Asset,...

Các hành động Non-deterministic yêu cầu một quy trình đồng thuận chặt chẽ (như Proof-of-Work hay Proof-of-Stake).
Mặt khác, các hành động Deterministic luôn có một kết quả duy nhất, đúng đắn một cách khách quan (ví dụ $1 + 1$ luôn cho ra kết quả $2$), do đó không cần phải đồng thuận.

Khi tách Consensus và Execution ra khỏi nhau, hành động **Chọn và sắp xếp các transaction** được thực hiện độc lập với hành động **Thực thi các transaction**.
Các node Consensus chỉ cần "đồng thuận" về thứ tự của các transaction trong block mà không cần phải tính toán lại trạng thái của block đó.
Trong khi đó các công việc tính toán các transaction được giao cho các Execution mà không phải lo lắng về việc đồng thuận.

Việc tách Consensus và Compute ra khỏi nhau giúp tận dụng tài nguyên mạng một cách hiệu quả hơn.
Các node Execution có thể tận dụng tối đa khả năng tính toán của mình mà không bị ảnh hưởng bởi Quá trình đồng thuận.
Đồng thời, các nút Consensus không cần phải đảm bảo lại các kết quả tính toán, giúp tiết kiệm đáng kể các khối lượng công việc của chúng.

Trong whitepaper của mình, Flow đã khẳng định việc này tăng hiệu suất của network [lên đến 56 lần](https://arxiv.org/pdf/1909.05821.pdf) so với các kiến trúc truyền thống.

<figure>
<img
    className="w-1/2 flex justify-center mx-auto"
    src="/static/images/posts/flow-nodes.gif"
    alt="Node đa vai trò"
/>
<figcaption>Source: flow.com</figcaption>
</figure>

#### Các loại node

##### Consensus - Đảm bảo tính hiệu quả

Các node **Consensus** (Đồng thuận) đóng vai trò quyết định sự hiện diện và thứ tự của các transaction trên network.
Chúng sử dụng một biến thể của thuật toán Proof-of-Stake là HotStuff.

##### Verification - Đảm bảo tính chính xác

Các node **Validation** (Xác minh) chịu trách nhiệm duy trì và giám sát các node Execution, ngoài ra cũng đóng vai trò như một kế toán viên trên network.
Cùng với các node Consensus, chúng tạo nên nền tảng bảo mật trên Flow.

##### Execution - Đảm bảo tính tốc độ và khả năng mở rộng

Các node **Execution** (Thực thi) có nhiệm vụ thực hiện các tính toán trong từng transaction.

##### Collection - Đảm bảo tính minh bạch và toàn vẹn

Các node **Collection** (Thu thập) xuất hiện để cải thiện khả năng kết nối trên network, giúp các dApp (Ứng dụng phi tập trung) dễ dàng truy xuất dữ liệu.
Cùng với các node Execution, chúng quyết định toàn bộ dữ liệu và thông tin trên network.

### SPoCK

#### Giới thiệu và ý nghĩa

**Specialized Proof of Confidential Knowledge** (Siêu bằng chứng về Kiến thức mật) là một hệ thống được sử dụng trong blockchain để đảm bảo tính toàn vẹn và an ninh của các transaction.
Dựa trên **Zero-Knowledge Proof** (Bằng chứng về Kiến thức mật), SPoCK cho phép các node trong mạng chứng minh rằng họ đã thực hiện cùng một chuỗi transaction mà không cần tiết lộ thông tin chi tiết về quá trình thực hiện.

Ý nghĩa của SPoCK là đảm bảo rằng các node trong mạng đã thực hiện cùng một chuỗi transaction mà không cần tiết lộ thông tin chi tiết về quá trình thực hiện.
Điều này giúp ngăn chặn các node "lười biếng" thông qua việc chứng minh rằng họ đã thực thi một transaction mà không cần phải thực hiện lại quá trình đó.
Ngoài ra, SPoCK cũng giúp phát hiện và ngăn chặn các cuộc tấn công giả mạo bằng cách xác minh tính hợp lệ của các chứng minh SPoCK.

#### Các định nghĩa

##### Định nghĩa 1

SPoCK gồm 4 thuật toán

- **SP-Setup**: Tạo ra các tham số công khai một cách ngẫu nhiên.
- **SP-KeyGen**: Tạo ra cặp Public Key (Khóa công khai) và Private Key (Khóa bí mật) cho mỗi node tham gia vào hệ thống.
- **SP-Prove**: Tạo ra một chứng minh SPoCK cho mỗi node bằng cách sử dụng Private Key và Private Message (Thông điệp bí mật) của node đó.
- **SP-Verify**: So sánh các chứng minh SPoCK để xác minh xem chúng có được tạo ra từ cùng một Private Message hay không mà không cần tiết lộ Private Message đó.

##### Định nghĩa 2

Cơ chế SPoCK cho ra hợp lệ nếu sử dụng SP-Verify cho hai chứng minh SPoCK (được tạo ra từ cùng một Private Message và hai Private Key khác nhau) cho ra hợp lệ.

##### Định nghĩa 3

Cơ chế SPoCK thỏa mãn tính chất bắt cầu. Cụ thể, nếu sử dụng SP-Verify cho nhiều hơn hai chứng minh SPoCK (được tạo ra từ cùng một Private Message và các Private Key khác nhau) sẽ cho ra hợp lệ khi và chỉ khi tất cả các chứng minh này được tạo ra từ cùng một Private Message.

##### Định nghĩa 4

Cơ chế SPoCK an toàn trong việc chống lại giả mạo Message vì kẻ tấn công không thể tạo ra một chứng minh SPoCK giả mạo dưới Key của mình mà không biết Private Message tương ứng.

##### Định nghĩa 5

Cơ chế SPoCK an toàn trong việc chống lại giả mạo Key vì kẻ tấn công không thể tạo ra một chứng minh SPoCK giả mạo dưới một Public Key khác của mình mà không biết Private Key tương ứng.

##### Định nghĩa 6

Cơ chế SPoCK an toàn chống lại việc giả mạo thông tin và khóa bí mật. Điều này đảm bảo rằng một kẻ tấn công không thể tạo ra một chứng minh SPoCK giả mạo mà không biết thông điệp bí mật tương ứng và không biết khóa bí mật tương ứng.

##### Định nghĩa 7

Cơ chế SPoCK có tính nghiêm ngặt. Nghĩa là, cho một chứng minh SPoCK $σ_a$ và hai Public Key $pk_a$ và $pk_b$, không thể tạo ra một chứng minh SPoCK $σ_a'$ khác mà cũng được xác minh bởi $\text{SP-Verify}(pk_a, σ_a', pk_b, σ_b)$.

##### Định nghĩa 8

Cơ chế SPoCK có tính duy nhất. Nghĩa là, cho một chứng minh SPoCK $σ_a$ và một Public Key $pk_a$, chỉ tồn tại duy nhất một chứng minh SPoCK $σ_b$ và $pk_b$ mà được xác minh bởi $\text{SP-Verify}(pk_a, σ_a, pk_b, σ_b)$.

#### Ý tưởng

- **Execution**: Mỗi node Execution sẽ tạo ra một chứng minh SPoCK cho mỗi chuỗi transaction mà nó thực thi.
  Chứng minh này sẽ được tạo ra bằng cách sử dụng Private Key (Khóa bí mật) của node Execution và một Private Message (Thông điệp bí mật) liên quan đến chuỗi transaction.
- **Verification**: Mỗi node Verification sẽ tạo ra một chứng minh SPoCK cho mỗi chuỗi transaction mà nó xác minh.

- **Consensus**: Mỗi node Consensus sẽ xác minh tính hợp lệ của các chứng minh SPoCK bằng cách so sánh chúng với nhau.
  Nếu các chứng minh SPoCK được tạo ra từ cùng một Private Message, chúng sẽ được chấp nhận. Ngược lại, nếu chúng không tương thích, chúng sẽ bị từ chối.

#### Thêm về Verifier’s Dilemma

**Verifier's Dilemma** (Song đề Người xác minh) là một vấn đề phổ biến trong các Decentralized System (Hệ thống Phân tán), đặc biệt là trong các mạng Blockchain.
Nó xảy ra khi các node tham gia trong hệ thống được giao nhiệm vụ xác minh công việc của các node khác, nhưng có động cơ để không thực hiện công việc này một cách trung thực.

Trong mạng blockchain, Verifier's Dilemma có thể xảy ra khi các node xác minh các transaction trong một khối.
Mặc dù các node được trả thưởng cho việc xác minh này, nhưng việc chấp nhận tất cả các kết quả mà không thực hiện xác minh sẽ cho chúng nhiều lợi nhuận nhất.
Điều làm suy yếu khả năng chống lại các hành động xấu.

Flow, một blockchain có hướng tiếp cận giải quyết Verifier's Dilemma thông qua kiến ​​trúc của nó kết hợp với SPoCK.
Trong Flow, các node Verification phải chứng minh rằng chúng biết về quá trình thực hiện của các transaction trong khối thông qua việc tạo ra chứng minh SPoCK.
Nếu các node Verification không thực hiện xác minh đúng, chúng sẽ bị trừ điểm và các node Execution cũng sẽ bị trừ điểm nếu tạo ra kết quả sai.

Điều này giúp giải quyết Verifier's Dilemma bằng cách tạo ra một cơ chế để đảm bảo tính trung thực cho các node Verification.
Một số kỹ thuật khác như truebit và Arbitrum cũng đã được đề xuất để giải quyết Verifier's Dilemma trong các Decentralized System khác.

### Ngôn ngữ lập trình Cadence

#### Giới thiệu

Cadence là một Interpreted Language (Ngôn ngữ thông dịch) được thiết kế đặc biệt cho việc viết Smart Contract (Hợp đồng thông minh) trên Flow.

Lấy ý tưởng từ ngôn ngữ Move của Diem (tên cũ là Libra, được phát hành bởi Facebook), Cadence có cốt lõi là một ngôn ngữ Resource-Oriented Programming (Lập trình hướng Tài nguyên).
Đây là một mô hình mới kết hợp các Type (Loại) và Capability (Khả năng) của một Object (Đối tượng), gọi là Resource (Tài nguyên) dùng để đại diện cho một Digital Asset (Tài sản Kỹ thuật số).
Do đó nó chỉ chỉ có thể tồn tại ở một vị trí tại một thời điểm, không thể được sao chép và không thể vô tình bị mất hoặc bị xóa và được quản lí xoay quanh các Capability của nó.

Việc sử dụng và các bảo mật đều dựa trên hệ thống Capability, trong đó thực thi quyền truy cập vào các đối tượng chỉ bị hạn chế đối với chủ sở hữu của Resource và những người có Reference (Tham chiếu) hợp lệ đối với đối tượng đó. Đây là hình thức kiểm soát truy cập chính của Cadence.

#### Giải thích về Resource-Oriented Programming

Để hiểu đơn giản, chúng ta sẽ đến với một ví dụ về một khu chợ.

##### Đối với kiểu Ledger

Tất cả mọi mặt hàng đều được lưu trữ trong một **Kho Lưu Trữ Trung Tâm** (là một Smart Contract).

Khi thực hiện bán hàng, chúng ta phải đi đến **Kho Lưu Trữ Trung Tâm** và giao nộp mặt hàng cho kho.

Khi thực hiện mua hàng, chúng ta phải đi đến **Kho Lưu Trữ Trung Tâm** và trả tiền để yêu cầu thay đổi thông tin về người sở hữu của mặt hàng.
Số tiền này sẽ được chủ kho chuyển lại cho chủ sở hữu trước của mặt hàng đó.

Khi thực hiện thay đổi thông tin, chúng ta cũng sẽ phải đi đến **Kho Lưu Trữ Trung Tâm**.
Sau khi xác nhận số căn cước công dân của mình khớp với thông tin về người sở hữu được in trên mặt hàng đó, chúng ta mới có thể thực hiện thay đổi thông tin.

Giả sử nếu kho bị cháy, tất cả mọi mặt hàng mà chúng ta đang bán sẽ bị mất mà không được đền bù.
Hay nếu có ai đó lẻn vào **Kho Lưu Trữ Trung Tâm** và thay đổi các thông tin như thông tin về người sở hữu hoặc các mặt hàng, chúng ta cũng sẽ không thể làm gì được.

##### Đối với kiểu ROP

Vẫn sẽ có một **Kho Lưu Trữ Trung Tâm** nhưng nó chỉ lưu trữ quy trình mua bán.

Khi thực hiện bán hàng, chúng ta không phải giao nộp mặt hàng cho kho mà chỉ cần điền các thông tin về mặt hàng cũng như bản thân.
Đồng thời **Cấp quyền: Truy cập vào thông tin mặt hàng** cho tất cả mọi người, **Cấp quyền: Lấy mặt hàng đi bất cứ lúc nào** cho chủ kho, và **Cấp quyền: Xem số tài khoản ngân hàng** cho chủ kho hoặc mọi người

Khi thực hiện mua hàng, chúng ta sẽ chuyển tiền trực tiếp cho chủ sở hữu và nhận về hàng hóa, hàng hóa này sẽ ở trong nhà của chúng ta.

Khi thực hiện thay đổi thông tin, vì chúng ta vẫn sở hữu nó trên tay, nên sẽ chỉ cần thực thay đổi lên chính mặt hàng đó mà không cần thông qua **Kho Lưu Trữ Trung Tâm**.

Giả sử nếu kho bị cháy, chúng ta vẫn sẽ không bị bất ảnh hưởng gì.
Và cũng sẽ không ai có thể lén thay đổi thông tin của một thứ đang nằm trên tay chúng ta.

Và tất nhiên, chúng ta hoàn toàn có thể hủy các quyền nếu không muốn bán nữa hoặc tặng hoàn toàn cho một ai đó mà không cần thông qua **Kho Lưu Trữ Trung Tâm**.

##### Phân quyền

Vì Resource về cơ bản là một Object, cho nên nó cũng chứa các function (hàm). Vì thế Resource ngoài việc dùng để đại diện cho một Digital Asset, nó còn có thể được sử dụng như một "tấm vé" để thực hiện một số hành động được hạn chế. Hay nói cách khác, Resource có tính phân quyền.

Ví dụ, đối với khu chợ, chúng ta sẽ nâng cấp lên thành một nơi với nhiều người cho thuê sạp (diện tích) để bán hàng. Khi đó sẽ có 4 cấp độ là: **Chủ khu chợ**, các **Chủ sạp**, các **Thương nhân** và cuối cùng là **Khách hàng**.

Mỗi người sẽ có một số quyền hạn - Capability cho các thao tác - function khác nhau, mà khi đó, các function sẽ được lưu trong Resource (ví dụ: chỉ **Thương nhân** mới có quyền quản lí và truy cập thông tin các **Khách hàng** của mình).
Để thực hiện một hành động, chúng ta sẽ lấy Resource ra và gọi đến function tương ứng. Do đó nếu không có Resource đó, chúng ta sẽ không thể thực hiện được hành động đó.
Và các resource này (nên) được cung cấp bởi một số điều kiện nhất định (ví dụ: chỉ khi thuê một sạp mới có thể trở thành **Thương nhân**).

##### Reference và các quyền

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
- Quyền chụp ảnh nó
- Quyền thay đổi nó (lấy đi hay thay đổi một vài linh kiện)
- Quyền sử dụng nó (thực hiện các thao tác mà nó cung cấp)
- Quyền xóa nỏ (chỉ người sở hữu - người có nó trên tay mới có thể làm điều này)

#### 5 trụ cột của Cadence

##### An toàn và Bảo mật

An toàn là độ tin cậy cơ bản của bất kỳ Smart Contract nào (tức là không có lỗi và thực hiện đúng chức năng của nó).
Bảo mật là ngăn chặn các cuộc tấn công vào mạng hoặc Smart Contract (nghĩa là các hành động trái phép của các tác nhân độc hại).

An toàn và bảo mật là rất quan trọng trong các Smart Contract vì tính chất bất biến của Blockchain và vì chúng thường xử lý các tài sản có giá trị cao.
Mặc dù việc kiểm thử sẽ là một phần quan trọng trong quá trình phát triển Smart Contract, Cadence vẫn phải tối đa hóa hiệu quả trong khi vẫn duy trì mức độ an toàn và bảo mật cao nhất tại nền tảng của nó.

##### Rõ ràng

Syntax (Cú pháp) cần phải dễ đọc và ý nghĩa của nó càng rõ ràng càng tốt.
Nó cũng phải đóng vai trò là một công cụ để có thể giúp đảm bảo các vấn đề về an toàn và bảo mật.
Những đảm bảo này có thể đạt được bằng cách làm cho mã khai báo và cho phép nhà phát triển thể hiện ý định của họ một cách trực tiếp.

##### Khả năng tiếp cận

Việc viết code phải càng dễ tiếp cận càng tốt.
Kết hợp các tính năng từ các ngôn ngữ như Swift và Rust, các developer sẽ thấy cú pháp và ngữ nghĩa của Cadence khá quen thuộc.
Đảm bảo các công cụ, tài liệu và các ví dụ thực tế cho các developer bắt đầu viết code một cách nhanh chóng và hiệu quả.

##### Trải nghiệm của developer

Các developer phải được hỗ trợ trong toàn bộ vòng đời phát triển, từ logic ứng dụng ban đầu đến các bản sửa lỗi trên chain.
Đây là một đặc điểm cực kì tuyệt vời của Cadence mà ít ngôn ngữ khác có được.

##### Quyền sở hữu trực quan với Resource

Cadence đảm bảo rằng Resource chỉ có thể tồn tại ở một vị trí tại một thời điểm và không thể bị sao chép hoặc bị mất do lỗi mã hóa.

Hầu hết các ngôn ngữ Smart Contract hiện đang sử dụng cách tiếp cận kiểu Ledger (Sổ cái) để ghi lại quyền sở hữu, trong đó các tài sản như Fungible Token (Mã thông báo Có thể thay thế) được lưu trữ trong Ledger trung tâm (là một Smart Contract) một cách toàn bộ.
Có nhiều nhược điểm đối với thiết kế này, đặc biệt là khi theo dõi quyền sở hữu của những Digital Asset thuộc về một tài khoản.
Để tìm ra tất cả tài sản mà một tài khoản sở hữu, nó sẽ phải liệt kê tất cả các Smart Contract có thể và tìm kiếm để xem liệu tài khoản có sở hữu những tài sản đó hay không.

Thêm một ưu điểm nữa trong thiết kế này so với kiểu Ledger là dù cho Smart Contract có bị hack, chỉnh sửa hay xóa đi thì vẫn không thể làm mất tài sản của người dùng.

Resource liên kết trực tiếp quyền sở hữu với tài khoản sở hữu nội dung đó bằng cách lưu nó vào bộ nhớ của tài khoản.
Do đó, quyền sở hữu không được tập trung trong kho lưu trữ của Smart Contract.

Mỗi tài khoản sở hữu các Digital Asset của riêng mình và các Digital Asset có thể được chuyển tự do qua lại giữa các tài khoản mà không cần phải xử lí bằng Smart Contract trung gian.
