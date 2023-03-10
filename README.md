## Date Range (날짜 기간 선택)

<br>

### 소개

**\[Daily Project\] 하루 동안 진행하는 간단한 프로젝트**

> 숙박, 렌터카 예매 등의 상황에서 흔히 사용되는 기능입니다.
>
> DateRange는 시작일과 종료일을 달력에서 선택하고, 사용자가 선택하도록 하고 싶은 또 하나의 항목의 정보를 전달 받아 날짜 기간과 함께 선택할 수 있는 컴포넌트입니다.

<br>

### 링크

GitHub: [https://github.com/dlwhd990/React-Components](https://github.com/dlwhd990/React-Components)

링크: [https://react-components.dlwhd990.vercel.app/daterange](https://react-components.dlwhd990.vercel.app/daterange)

<br>

### 사용 기술

- React (18.2.0)
- TypeScript (4.4.2)

<br>

### 요구 기능

1.  사용자가 선택한 연-월에 맞는 달력이 출력된다. (시작은 실제 날짜에 해당하는 연-월)
2.  시작일을 선택한다. 시작일을 선택하면 자동으로 마감일 선택으로 넘어간다.
3.  시작일이 선택된 상태에서 마감일이 선택되면 달력 상에 색칠된 상태로 기간을 표시한다.
4.  마감일부터 선택할 수 있다. 이 경우에는 마감일을 선택하면 시작일 선택으로 넘어간다.
5.  두 날짜를 모두 선택하고 결정 버튼을 누르면 시작일과 마감일의 정보가 callback 함수의 파라미터로 넘어가 실행된다.
6.  날짜 외에 다른 정보도 함께 선택하도록 하고싶을 수 있다. 이를 props로 받아 출력하고, 선택한 내용을 반환하도록 한다.

<br>

### 사용 예시

![사용](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674117881/use2_bglkki.webp)

<br>

### 사용 방법

![image](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674115963/dateRange_sadtyg.png)

> itemTitle: 위의 사용예시의 '렌터카'와 같이, 사용자가 직접 제목을 설정합니다.
>
> itemList: 사용자가 넣고 싶은 리스트를 넣습니다. (아직은 string\[\]만 사용 가능합니다.)
>
> callBack: DateRange로 부터 반환된 결과를 받아올 수 있는 콜백함수입니다.

<br>

![image](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674115964/dateRange2_kuqu1k.png)

위의 3가지 항목을 모두 선택 완료한 후 오른쪽의 버튼을 누르면 콜백함수가 실행됩니다.

사용자는 이 콜백함수를 사용하여 결과 데이터를 자신이 원하는 방식으로 사용할 수 있습니다.

> \[result 프로퍼티\]
>
> item: string
>
> start: {year: number, month: number, date: number} (month의 경우 실제 달 - 1)
>
> end: {year: number, month: number, date: number} (month의 경우 실제 달 - 1)

<br>

### 달력 만들기

> 실제와 똑같은 달력을 만듭니다.

1.  Date를 사용하여 현재 날짜 정보를 얻습니다.
2.  현재 달의 1일은 무슨 요일인지 알아냅니다.
3.  만약 목요일이라면 Date.getDay()의 결과는 4입니다. 이 때, 이 달의 달력에는 1일 이전에 4칸이 빈 칸으로 남아 있어야 합니다. (일,월,화,수는 저번 달에 해당되기 때문입니다.)
4.  해당 달의 모든 날짜를 하나의 Array에 넣을 것인데, 3번의 결과로 맨 앞에 4개의 더미 데이터를 넣어줍니다.
5.  이후, 달의 날짜 수에 맞게 Array에 모든 날짜를 넣어줍니다. 여기서 날짜는 {year: 2023, month: 0, date: 19}와 같은 object입니다. 윤년 2월에는 29일을 넣어줍니다. (더미데이터는 year, month, date에 음수가 들어갑니다.)
6.  5번 까지의 결과로 얻은 Array를 slice로 7개씩 쪼개어 달력의 HTML부분에 map을 통해 추가합니다.
7.  오른쪽에는 그 다음 달의 달력도 출력되어야 합니다. 만약 현재 선택된 달이 12월이라면 다음 년도의 1월을 1~6번 과정을 거쳐서 출력되도록 하고, 12월이 아니라면 현재 달+1인 달의 달력을 출력합니다.

<br>

### 예외 처리하기

> 사용자가 잘못 선택하여, 시작일보다 종료일이 빠른 경우가 생길 수 있습니다.

1.  시작일을 먼저 고르고 종료일을 시작일보다 빠른 날짜로 고른 경우
2.  종료일을 먼저 고르고 시작일을 종료일보다 늦은 날짜로 고른 경우

이렇게 두 가지 경우가 있는데, 공통점은 '이미 시작일과 종료일 중 하나를 고른 후에 또 다른 하나를 고른 경우'라는 점입니다.

그렇기 때문에, 시작일/종료일 둘 중에 하나를 골랐을 때, 다른 하나의 선택 여부를 확인하고 선택 되었다면 Date.getTime()을 사용하여 빠른 날짜가 어떤 것인지를 판별했습니다.

만약 예외 상황임을 판단했다면 다음과 같이 동작합니다.

1.  시작일을 이전에 선택한 상태에서 시작일보다 빠른 종료일을 선택했다면, 지금 선택한 날짜가 종료일이 아닌 시작일로 등록됩니다.

2.  종료일을 이전에 선택한 상태에서 종료일보다 늦은 시작일을 선택했다면, 지금 선택한 날짜가 시작일이 아닌 종료일로 등록됩니다.

<br>

### ETC

[에어비앤비](https://www.airbnb.co.kr/)를 보고 UI와 요구 기능을 참고하여 제작하였습니다.
