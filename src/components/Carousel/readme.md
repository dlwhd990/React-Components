## Carousel

---

### 소개

**[Daily Project] 하루 동안 진행하는 간단한 프로젝트**

> 수많은 웹사이트에서 흔히 볼 수 있는 carousel입니다.<br><br>저도 프로젝트에서 사용해 본 적이 있지만, 패키지를 받아 사용해보았고 직접 구현해 본 경험은 없었습니다.<br><br>이번 기회에 직접 구현해보며 동작 원리에 대해 이해하고, 쉽게 재사용 가능하도록 제작하여 이후의 프로젝트에서 사용이 용이하도록 하였습니다.

\*이 프로젝트의 예시 이미지는 [야놀자](https://www.yanolja.com/) 의 이미지를 사용하였습니다.

<br>

### 링크

- GitHub: [https://github.com/dlwhd990/React-Components/tree/main/src/components/Carousel](https://github.com/dlwhd990/React-Components/tree/main/src/components/Carousel)
- 링크: [https://react-components.dlwhd990.vercel.app/carousel](https://react-components.dlwhd990.vercel.app/carousel)

<br>

### 사용 기술

- React (18.2.0)
- TypeScript (4.4.2)
- "@fortawesome/fontawesome-svg-core": "^6.2.1",
- "@fortawesome/free-solid-svg-icons": "^6.2.1",
- "@fortawesome/react-fontawesome": "^0.2.0",

<br>

### 설명

![명세](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674357509/camy_gzpcba.png)

#### [인터페이스]

- interface Image: Carousel에서 사용할 이미지의 type alias입니다.
- interface CarouselProps: Carousel에 직접 들어갈 props들의 type alias입니다.

<br>

#### [Props]

<br>

| 이름                               | 설명                                                                                                                                                                                                                                 | 타입                         | 필수 | 기본값      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- | ---- | ----------- |
| imageList                          | Carousel에서 사용할 **Image 타입의 객체들이 들어가는 Array**입니다. (2개 이상부터 정상 동작합니다.)                                                                                                                                  | Image[]                      | O    | -           |
| duration                           | 이미지가 **slide될 때 걸리는 시간**을 지정합니다. (단위: ms)                                                                                                                                                                         | number                       | O    | -           |
| imageWidth                         | **이미지의 width**를 지정합니다. (단위: px)                                                                                                                                                                                          | number                       | O    | -           |
| imageMargin                        | **이미지 간의 margin**입니다. (단위: px)                                                                                                                                                                                             | number                       | O    | -           |
| imageHeight                        | **이미지의 height**를 지정합니다.                                                                                                                                                                                                    | number                       | O    | -           |
| sideWidth                          | 선택된 이미지의 **양옆 이미지가 살짝 보일 부분**의 width를 지정합니다. (단위: px)                                                                                                                                                    | number                       | O    | -           |
| translateX                         | Carousel list의 초기 X좌표 위치를 변경합니다 (하단 설명 첨부)                                                                                                                                                                        | number                       | O    | -           |
| arrowShowType                      | 화살표가 보여질 방식을 지정합니다. <br>- static: 계속 고정된 상태로 보여집니다.<br>- hover: Carousel에 hover하면 보여지고, 아니라면 보이지 않습니다.<br>- none (DEFAULT): 화살표가 보이지 않습니다. 값을 지정하지 않으면 선택됩니다. | string                       | X    | none        |
| arrowLeftButton & arrowRightButton | 좌우 화살표의 아이콘을 지정합니다. Fontawesome 패키지를 받아 사용할 수 있습니다.                                                                                                                                                     | IconDefinition (Fontawesome) | X    | 기본 화살표 |
| arrowSize                          | **화살표 아이콘의 크기**를 지정합니다. (단위: px)                                                                                                                                                                                    | number                       | O    | -           |
| arrowButtonSize                    | **화살표 버튼의 크기**를 지정합니다. (단위: px)                                                                                                                                                                                      | number                       | O    | -           |
| arrowButtonBackGroundColor         | **화살표 버튼의 배경 색상**을 지정합니다.                                                                                                                                                                                            | string                       | O    | -           |
| dotSize                            | 하단 중앙의 **점의 크기**를 지정합니다. (단위: px)                                                                                                                                                                                   | number                       | O    | -           |
| autoPlay                           | **자동 재생 여부**를 지정합니다.                                                                                                                                                                                                     | boolean                      | O    | -           |
| autoPlayDelay                      | **자동 재생의 시간 간격**을 지정합니다 (단위: ms)                                                                                                                                                                                    | number                       | O    | -           |

<br>

#### [translateX]

![tx](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674357810/ff_ehemab.png)

값이 0인 경우, **기본적으로 하나의 이미지가 중앙에 위치**하는 형태입니다.

![tx](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674358043/ddd_ifzbao.png)

값을 지정할 경우 다음과 같이 변형하여 사용할 수 있습니다.

<br>

---

## 제작 과정

> Carousel 제작 과정의 발상, 마주친 문제점과 해결 방법 등의 내용을 정리하였습니다.

<br>

### 1. 원리

Carousel을 제작하기 위해, 그 원리를 먼저 이해할 필요가 있었습니다.

![ca](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674305998/ca1_t8a06e.png)

Carousel은 하늘색 부분과 같은 가로로 길게 나열되어 있는 아이템들의 목록이 있고, 다음 아이템을 보이고 싶다면 이 목록을 옆으로 일정 거리만큼 이동 시키며 실제 보이는 부분(중앙의 노란 부분)에 다음 아이템이 위치하도록 합니다.

이동하는 방법은 **transform: translate3d**를 사용하였습니다. translate3d를 사용하면 GPU를 사용하기 때문에 더 나은 퍼포먼스를 보일 수 있다고 합니다.

그리고 하늘색의 목록은 길이가 매우 길어지기 때문에 노란색 부분에 **overflow: hidden**을 사용하여 이를 초과하는 부분은 보이지 않도록 해야합니다.

그리고 양 옆으로 이동하는 듯한 효과를 주기 위해 **transition-duration** 속성에 값을 부여하였습니다.

<br>

### 2. Width 계산

실제 보이는 부분의 Width는 어떻게 설정하여야 원하는 대로 구현할 수 있을 지 고민해보았습니다.

![ca2](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674307041/ca2_hqgnzx.png)

구간을 나누어보면 다음과 같고, (1번 X 2) + (2번 X 2) + 3번 만큼의 크기가 되어야 함을 알 수 있었습니다.

<br>

### 3. 이동 거리

저는 왼쪽, 오른쪽 버튼을 제작하여 왼쪽 버튼을 누르면 현재 아이템의 왼쪽에 있는 아이템이 보이도록 하였고, 오른쪽 버튼을 누르면 오른쪽의 아이템이 보이도록 하였습니다.

이 때, 몇 픽셀만큼 이동하여야 정확히 다음 아이템이 중앙에 위치할 수 있을까요?

![ca3](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674307714/ca3_ojo62h.png)

만약 왼쪽으로 한 칸 이동한다고 한다면, 현재 아이템은 현재 아이템의 왼쪽에 위치한 아이템과 동일한 위치로 이동해야 합니다.

그렇기 때문에 위의 사진의 오른쪽 하늘색 선 지점부터 왼쪽 하늘색 선 지점까지 이동해야 합니다.

그 값은 1번 + 2번 + 4번과 같고, 1번은 3번과 길이가 같기 때문에 2번 + 3번 + 4번이라고도 할 수 있는데 3번 + 4번은 아이템의 width와 같고 2번은 margin 길이이므로 결국 **아이템 width + margin 길이** 만큼 이동하면 된다는 결론을 얻을 수 있었습니다.

<br>

### 4. 무한 슬라이드

다른 웹사이트에서 사용하는 Carousel을 보면, 마치 슬라이드가 무한대인 것 처럼 동작합니다.

가장 처음 아이템에서 왼쪽으로 이동하면 맨 마지막의 아이템이 마치 원래 자신의 자리가 그곳인 것 처럼 등장합니다.

하지만 저는 위와 같이 동작하려고 하면, transition-duration 속성 때문에 왼쪽에서 맨 오른쪽 까지 한 번에 이동하는 과정이 모두 눈에 보여 무한한 느낌을 전혀 주지 못했습니다.

저는 이런 기능을 구현하려고 했지만, 쉽게 아이디어를 생각해낼 수 없었습니다.

그래서 인터넷에 검색하여 도움을 받을 수 있었고, 제가 구현한 방법은 다음과 같습니다.

> 가장 먼저, [1,2,3,4,5]라는 아이템 목록을 Carousel에 넣는다고 해봅시다.<br><br>
>
> 1. 아이템 목록의 양 끝에 반대편 양 끝 아이템들을 몇 가지 추가합니다.<br>
>    ex) [**4**,**5**,1,2,3,4,5,**1**,**2**]<br>
> 2. 만약 1에서 왼쪽으로 이동했다면, 1번에서 새롭게 추가한 5로 이동합니다.
> 3. 이 때, 원래 5의 위치는 오른쪽 맨 끝입니다. 그렇기 때문에 원래 5의 위치로 이동합니다.
> 4. 3번 과정을 그냥 실행하게 되면 transition-duration 때문에 무한한 효과를 주지 못합니다. 그래서 이 css 속성을 잠시 해제하고, 이동하고, 다시 적용합니다. 이렇게 하면 아무런 효과 없이 이동하고, 왼쪽의 5번과 오른쪽의 5번은 겉모양이 같기 때문에 마치 이동하지 않은 것처럼 보입니다.
> 5. 오른쪽 이동도 마찬가지이며 위의 과정들로 인해 마치 슬라이드가 무한인 것 처럼 보일 수 있습니다.

<br>

### 5. setState (Async)

위의 무한 슬라이드 구현 과정에서, 문제점을 발견하였습니다.

저는 **현재 보여지는 아이템의 번호 (idx)** 와 **transition-duration 적용 여부 (transitionOn)** 를 state 변경에 따른 리렌더링을 위해 useState를 사용하였습니다.

![cacode](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674310030/ca_pqq5ro.png)

문제가 발생한 과정을 쪼개어보면

1. transition-duration에 의해 300ms의 시간동안 이동하여 왼쪽의 새로 추가된 5가 선택됨 (idx = 1)
2. setState로 transitionOn state를 false로 변경
3. setState로 idx를 list.length-3으로 이동
4. setState로 transitionOn state를 true로 변경

다음과 같습니다. 우선 적어도 1번 단계의 300ms 동안의 이동 이후에 2번이 실행 되어야 하는데 그렇지 못한 점, setState는 비동기적으로 실행되기 때문에 transitionOn이 false가 되고 true가 되기 전에 3번의 과정이 완벽하게 실행되는 것은 불가능했습니다.

저는 여러 해결 방법을 생각해보던 중, 1번과 2번 사이의 문제 때문에 **setTimeout**을 사용하게 되었습니다.

1번과 2번 사이의 문제는 어떠한 값이 변경되거나 비동기적인 함수의 실행이 종료되는 것 등을 기다리는 것이 아니라 단순히 **사용자가 설정한 duration 시간 동안 카드가 넘어가는 애니메이션이 끝나는 것** 만을 기다려야 합니다.

그렇기 때문에 setTimeout을 사용하면 **최소한 주어진 시간 이후에 콜백 함수가 실행되는 것은 보장**할 수 있기 때문에 이런 상황에 적절하게 사용할 수 있었습니다.

<br>

### 6. 버튼 연타

무한 슬라이드는 완성했지만 한 가지 문제점을 발견하였습니다.

위의 5번의 과정에서 setTimeout을 사용하였는데, 왼쪽/오른쪽 버튼을 setTimeout에서 지정한 시간 보다 빠르게 연타하면 이런 현상이 발생했습니다.

![caproblem](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674311830/capro_gp5msh.webp)

transition-duration 때문에 연타해도 바로바로 움직이지 않는 문제도 있고

![cacode](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674312069/ca2_m1aigq.png)
이 코드 부분에서 idx는 (imageList.length-3) 위치에 있는 상태에서 오른쪽 버튼을 클릭 한 경우, 우선 무한 슬라이드를 위해 새로 추가한 부분인 (imageList.length-2) 위치로 이동한 후 아래의 moveWithoutTransition 함수 내부의 코드에 의해 원래 있어야 할 자리로 이동합니다.

하지만 moveWithoutTransition 함수 내부의 setTimeout이 실행되기 전에 오른쪽 버튼을 한 번 더 클릭했다면 올바른 위치로 가기 전에 (imageList.length-1) 또는 그 이상인 imageList.length를 초과하는 부분까지 넘어가는 비정상적인 모습이 보일 수 있습니다.

![cacode](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674313329/ca3_cypkao.png)

저는 'clicked' 라는 boolean type의 state를 하나 선언하여 이 문제를 해결하였습니다.

초기 값은 false이며, 만약 버튼을 클릭한 경우 clicked는 true로 바뀌고 아래의 코드를 실행합니다.

clicked가 다시 false로 바뀌는 과정은 별도의 함수로 제작하였는데 setTimeout을 사용하여 transition-duration시간보다 조금 더 시간이 지나야만 false로 바뀌도록 하여 버튼을 연타하는 행위 자체를 방지할 수 있었습니다.

버튼 클릭은 **이전 버튼 클릭에 의한 동작이 모두 수행 된 이후**에 가능해야 하므로 clicked가 false로 바뀌는 과정에는 **최소한 주어진 시간 이후에 콜백 함수가 실행되는 것은 보장**할 수 있는 setTimeout을 사용하였습니다.

<br>

### 7. 드래그

Carousel이 마우스 또는 터치에의해 드래그 되었다면 드래그 된 만큼 이동해야 합니다.

드래그 과정을 나누어 생각해보면, 마우스 버튼을 **누른** 상태로 마우스를 **이동**하고, 버튼을 **release**하여 종료합니다.

그리고 드래그가 종료된 시점에서 Carousel의 중앙에 위치할 아이템을 판단하여 그대로 유지하거나 변경합니다.

저는 이 과정을 3가지 마우스 이벤트를 사용하여 드래그 기능을 구현하였습니다.

1. Mouse Down

마우스 버튼을 press 했을 때 발생하는 이벤트입니다. 이 이벤트가 발생하였다는 것은 드래그를 실행할 수 있다는 것이므로 시작의 의미를 가지고, 이 이벤트가 발생한 지점의 x좌표는 **드래그의 시작점의 x좌표**를 의미합니다.

2. Mouse Move

마우스 커서를 이동할 때 발생하는 이벤트입니다. 드래그는 마우스를 누른 상태로 이동할 때 발생하는 것이기 때문에 드래그에 의한 Carousel의 이동을 구현하기 위해서는 이 이벤트가 반드시 필요했습니다.<br> 이 이벤트의 listener를 계속해서 등록해놓는다면, 마우스를 이동할 때마다 매우 많은 이벤트가 발생하게 됩니다. 그렇기 때문에 **mousedown 이벤트가 발생한 경우에만 listener를 등록**시켜 불필요한 이벤트를 감지하는 것을 방지하였습니다.

3. Mouse Up

마우스 버튼을 누르고 있다가 release하면 발생하는 이벤트입니다. 이 이벤트가 발생하였다는 것은 **드래그 과정이 종료되었다는 것을 의미**하고, 그렇기 때문에 이 이벤트가 발생하면 mousemove listener를 remove합니다. 그리고 이 이벤트가 발생한 지점의 x좌표는 **드래그가 끝난 지점의 x좌표**를 의미합니다.<br>드래그가 종료되면 중앙에 위치할 아이템이 어떤 것이어야 할지 판단해야 합니다. 저는 mousedown 이벤트가 발생한 x좌표와 mouseup 이벤트가 발생한 x좌표의 차이를 계산하여 이를 판단하도록 구현하였습니다.

<br>

### 8. Drag의 Side Effect

드래그는 mouseup이벤트가 발생하면 종료됩니다.

저는 이미지를 클릭하였을 때, 다른 링크로의 이동을 위해 a태그로 img태그를 감싸도록 제작하였는데 드래그를 끝내는 mouseup이벤트가 발생하였을 때 a태그에 click 이벤트가 발생하여 해당 링크로 이동되는 의도하지 않은 동작이 일어나는 것을 발견하였습니다.

제가 생각한 해결 방법은 다음과 같습니다.

1. isDragging이라는 boolean type의 state를 생성하고 초기값을 false로 둡니다.
2. mousedown 이벤트가 발생하였을 때, 사용자가 이것을 클릭하여 링크 이동을 원하는 것인지 드래그를 원하는 것인지 알지 못합니다. 따라서 mousemove이벤트에 판단을 맡깁니다.
3. mousemove된 x좌표가 mousedown된 x좌표와 일정 거리 이상 차이가 난다면 드래그를 원하는 것으로 판단하여 isDragging state를 true로 변경하여 현재 드래그 중임을 알 수 있게 합니다.
4. 드래그가 끝나면 isDragging을 false로 변경합니다.

여기서 하나의 문제점을 발견했습니다.

![problem](https://res.cloudinary.com/dkcii4rqf/image/upload/v1674380561/e2_foq60q.png)
click 이벤트의 handler는 mouseup 이벤트의 handler보다 나중에 실행됩니다. (order is fixed)

isDragging state가 다시 false로 변경되는 것은 mouseup event listener의 콜백함수에서 처리해야 하는데, click event의 콜백함수는 mouseup 이벤트의 콜백함수보다 나중에 실행되기 때문에 이미 isDragging state가 false가 된 상태에서 a태그가 클릭된 것으로 되어 링크 이동을 방지할 수 없었습니다.

이 문제도 setTimeout으로 해결할 수 있었습니다. isDragging을 false로 변경하는 부분만 setTimeout에 두어, 이를 **바로 실행하는 것이 아니라 JS Runtime의 Web APIs에서 주어진 시간(기다릴 필요가 없으니 0으로 지정)이 지난 후 Callback Queue의 맨 마지막에 들어가도록** 하여 a 태그의 click event의 콜백 함수보다 더 나중에 실행되게 하였습니다.

<br>

### 9. 자동 재생

흔히 볼 수 있는 Carousel들을 보면, 일정 시간마다 자동으로 한 칸 씩 이동합니다.

주어진 시간마다 반복되어야 하기 때문에 저는 setTimeout을 사용하여 구현했습니다.

1. setTimeout의 콜백함수에 오른쪽으로 한 칸 이동하는 함수를 두고 이를 **useEffect**에서 실행하도록 합니다.
2. useEffect의 **의존성 배열에 idx**(현재 중앙에 있는 아이템의 index)가 들어갑니다. 위의 콜백함수는 idx를 변경시켜 오른쪽으로 한 칸 이동하는 것이기 때문에, 콜백함수가 실행되면 자연스럽게 다시 setTimeout이 설정되어 정해진 시간만큼 기다린 후 콜백함수를 실행하고 이것은 계속 반복됩니다.

자동 재생에서는 한 가지 기능을 추가했습니다. Carousel을 사용하는 어떤 서비스에서, 직접 하나씩 넘기며 보고있는데 타이머 시간마다 계속 자동재생이 되어 불편함을 느낀 적이 있었습니다.

그래서 저는 드래그, 화살표 버튼 클릭 등의 동작이 일어나면 타이머를 잠시 해제하여 위와 같은 현상이 발생하지 않도록 구현하였습니다.

방법은 화살표 버튼 클릭과 드래그에 의해 실행되는 함수들 내부에 **clearTimeout**을 하여 타이머를 clear 해줍니다.
여기서 **버튼 클릭은 idx를 반드시 변경시키는 동작**이기 때문에 useEffect에 의한 타이머 설정이 자동적으로 일어나게 됩니다.

드래그 또한 idx를 변경시킬 수 있지만, 반드시 변경되는 것이 보장되는 것은 아닙니다. 그렇기 때문에 드래그는 mousedown 이벤트가 발생하였을 때 clear 하였다가, **mouseup 이벤트가 발생하면 timer를 수동으로 다시 설정**해주었습니다.

<br>
