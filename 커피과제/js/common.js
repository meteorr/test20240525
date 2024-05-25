// 1) 음료라는 그룹(배열)로 (음료 데이터 "배열객체" 만들기)데이터 만들기
const drink = [{
    image: 'img/Jeju Hallabong Matcha Mango Smoothie.jpg',
    nameKor: '제주한라봉 말차 망고 스무디',
    nameEng: 'Jeju Hallabong Smoothie',
    price: 6000
},{
    image: 'img/Earl Grey Black Sugar Bubble Tea.jpg',
    nameKor: '얼그레이 블랙슈가 버블티',
    nameEng: 'Earl Grey Bubble Tea',
    price: 5000
},{
    image: 'img/Grapefruit Ade.jpg',
    nameKor: '자몽에이드',
    nameEng: 'Grapefruit Ade',
    price: 4500
},{
    image: 'img/Jeju Matcha Latte.jpg',
    nameKor: '제주말차라떼',
    nameEng: 'Jeju Matcha Latte',
    price: 5500
},{
    image: 'img/Sunset Ade.jpg',
    nameKor: '선셋 에이드',
    nameEng: 'Sunset Ade',
    price: 5500
},{
    image: 'img/Strawberry Mango Ade.jpg',
    nameKor: '딸기 망고 에이드',
    nameEng: 'Strawberry Mango Ade',
    price: 4500
},{
    image: 'img/Sweet Potato Latte.jpg',
    nameKor: '밤고구마 라떼',
    nameEng: 'Sweet Potato Latte',
    price: 4000
},{
    image: 'img/Deep Blueberry juice.jpg',
    nameKor: '진한 블루베리 주스',
    nameEng: 'Deep Blueberry juice',
    price: 6000
},{
    image: 'img/Strawberry Milk Tea.jpg',
    nameKor: '딸기 밀크티',
    nameEng: 'Strawberry Milk Tea',
    price: 5700
}];
// 배열객체의 정보를 콘솔에 출력
// console.log(drink[1].nameEng);
// 2) 데이터를 화면에 그리기 > 배열객체의 정보 모두를 출력
// .drink-menu ul안에 li로 메뉴정보 출력
const drinkMenu = document.querySelector('.drink-menu');

function addMenuDrawUI(){
    let lists = '';
    for(let i=0; i<drink.length; i++){
        // console.log(drink[i].nameKor);
        lists += `
            <li class="menu-list">
                <img src="${drink[i].image}" alt="${drink[i].nameEng}">
                <dl>
                    <dt class="drink-tit">${drink[i].nameKor}</dt>
                    <dd class="drink-txt">${drink[i].nameEng}</dd>
                    <dd class="drink-price">${drink[i].price.toLocaleString()}원</dd>
                </dl>
            </li>
        `;
    }
    return lists;
}
// console.log(lists);
drinkMenu.innerHTML = addMenuDrawUI();

// // 3-1) 주문용 "배열 객체" 만들기: 주문내역에 필요한 정보
// // 메뉴리스트에 있는 음료를 클릭하면 콜솔에 해당 주문 리스트를 출력
// // 객체화 [{음료명:음료명,수량:1,가격:4000}]
// // 주문자료=배열객체, 메뉴를 클릭했을 때
const menuList = document.querySelectorAll('.menu-list');
// // 메뉴를 클릭하면 주문객체를 만드는 함수 호출
menuList.forEach((item, index) => {
    item.addEventListener('click', () => { 
        // 객체를 만드는 함수를 호출
        orderObj(index);
    });
});

let orderArr = [];
// let orderCount = 0;
function orderObj(index){
    let obj = drink[index];
    let bool = orderArr.some((item)=>item.nameKor == obj.nameKor);
    console.log('참거짓 판별:'+bool);
    if(bool){
        return alert('선택하신 음료는 주문내역에 있으니 확인해주세요.');
    }
    // console.log(orderArr);
    // 주문객체 생성
    let choiceMenu = {
        nameKor : obj.nameKor,
        price : obj.price,
        count : 1,
        totalPrice : obj.price
    }
    orderArr.push(choiceMenu); //push() : 배열함수(배열의 마지막방에 자료를 담음)
    orderlistBox.innerHTML = orderDrawUI();
}

//함수화(화면애 그리는 작업)
const orderlistBox = document.querySelector('.orders-container');
function orderDrawUI(){
    let lists = '';
    for(let i=0; i<orderArr.length; i++){
        lists += `
            <dl class="order">
                <dt class="order-name">${orderArr[i].nameKor}</dt>
                <dd class="order-quantity">
                    <button type="button" class="minus" onclick="minus(${i})">-</button>
                    <span class="count">${orderArr[i].count}</span>
                    <button type="button" class="plus" onclick="plus(${i})">+</button>
                </dd>
                <dd class="order-price">${orderArr[i].totalPrice.toLocaleString()}원</dd>
            </dl>
        `;
    }
    updateTotalPrice();
    return lists;
}
function plus(inx){
    // console.log(inx);
    orderArr[inx].count += 1;
    // 해당 음료의 총 금액을 해당 음료의 orderArr[inx].totalPrice에 반영
    orderArr[inx].totalPrice = (orderArr[inx].price * orderArr[inx].count);
    console.log(orderArr);
    orderlistBox.innerHTML = orderDrawUI();
}
function minus(inx){
    // let orderCount = orderArr[inx].count;
    if(orderArr[inx].count == 1){
        orderArr.splice(inx, 1); // splice(시작인덱스, 개수)
    }else{
        orderArr[inx].count -= 1;
        orderArr[inx].totalPrice = (orderArr[inx].price * orderArr[inx].count);
    }
    console.log(orderArr);
    orderlistBox.innerHTML = orderDrawUI();
}
// orderArr의 모든 객체.totalPrice를 모두 더한 값을 콘솔에 출력 >> 후에 UI에 반영
    // 스크립트에서 누적 합산하는 방법
    // 총 결제 금액 : orderArr[i].totalPrice
    function updateTotalPrice() {
        // let total = [];
        // let totalNum = 0;
        // for(let i=0; i<total.length; i++){
        //     totalNum += total[i]
        // }
        const total = orderArr.reduce((total, order) => total + (order.price * order.count), 0);
        console.log(total);
        const totalPriceDisplay = document.querySelector('.total-price dl');
        totalPriceDisplay.innerHTML = `<dt>결제 금액</dt><dd>${total.toLocaleString()}원</dd>`;
    }

// 합산한 최종 금액만 표시














// 2) 데이터를 화면에 그리기
// function displayDrinks() {
//     const drinkMenu = document.querySelector('.drink-menu');
//     drinkMenu.innerHTML = '';

//     drink.forEach((drink, index) => {
//         const formattedPrice = drink.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//         // console.log(formattedPrice);

//         const drinkHTML = `
//             <li class="menu-list" data-index="${index}">
//                 <img src="${drink.image}" alt="${drink.nameEng}">
//                 <dl>
//                     <dt class="drink-tit">${drink.nameKor}</dt>
//                     <dd class="drink-txt">${drink.nameEng}</dd>
//                     <dd class="drink-price">${formattedPrice}원</dd>
//                 </dl>
//             </li>
//         `;
//         drinkMenu.innerHTML += drinkHTML;
//     });
//     // 주문 클릭 이벤트
//     const menuItems = document.querySelectorAll('.menu-list');
//     menuItems.forEach((item, index) => {
//         item.addEventListener('click', () => {
//             addDrinkToOrderList(index);
//         });
//     });
// }

// function addDrinkToOrderList(selectedIndex) {
//     const selectedDrink = drink[selectedIndex];
//     const existingOrder = orders.find(order => order.nameEng === selectedDrink.nameEng);
//     if (existingOrder) {
//         existingOrder.quantity += 1;
//     } else {
//         orders.push({ ...selectedDrink, quantity: 1 });
//     }
//     displayOrders();
// }

// // 3-1) 주문용 "배열 객체" 만들기:
// let orders = [];

// // 3-2) 주문 데이터 화면에 그리기
// // 3-3) 버튼 추가( 음료추가(+), 음료삭제(-))
// function displayOrders() {
//     const orderListDisplay = document.querySelector('.orders-container');
//     orderListDisplay.innerHTML = '';

//     orders.forEach(order => {
//         const orderHTML = `
//             <dl class="order">
//                 <dt class="order-name">${order.nameKor}</dt>
//                 <dd class="order-quantity">
//                     <button onclick="changeQuantity('${order.nameKor}', -1)">-</button>
//                     <span>${order.quantity}</span>
//                     <button onclick="changeQuantity('${order.nameKor}', 1)">+</button>
//                 </dd>
//                 <dd class="order-price">${order.price * order.quantity}원</dd>
//             </dl>
//         `;
//         orderListDisplay.innerHTML += orderHTML;
//     });
//     updateTotalPrice();
// }
// // 음료 주문 목록에 추가
// function changeQuantity(nameKor, change) {
//     const order = orders.find(order => order.nameKor === nameKor);
//     if (order) {
//         order.quantity += change;
//         if (order.quantity < 0) order.quantity = 0;
//         displayOrders();
//     }
// }
// // 3-4) 총 결제 금액 화면에 그리기
// function updateTotalPrice() {
//     const total = orders.reduce((total, order) => total + (order.price * order.quantity), 0);
//     const totalPriceDisplay = document.querySelector('.total-price dl');
//     totalPriceDisplay.innerHTML = `<dt>결제 금액</dt><dd>${total.toLocaleString()}원</dd>`;
// }

// document.addEventListener('DOMContentLoaded', function() {
//     displayDrinks();
// });