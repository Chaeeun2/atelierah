// 프로젝트 데이터 (국문/영문)
// 이미지 종류:
// - thumbnail: 썸네일 (Works 페이지)
// - slider: 대표이미지 (슬라이드, 여러 장)
// - sketch: 스케치 (info 섹션에서 호버 시 펼쳐짐)
// - layout: 레이아웃 이미지 (여러 장)

export const projects = [
  {
    id: 1,
    // 이미지 종류별 분리
    images: {
      thumbnail: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_01.jpg",
      slider: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_01.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_04.jpg"
      ],
      sketch: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_91.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_92.jpg"
      ],
      layout: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_layout.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_layout.jpg"
      ]
    },
    title: {
      ko: "gilchi cafe",
      en: "gilchi cafe"
    },
    category: {
      ko: "interior",
      en: "interior"
    },
    // 상세 페이지 내용 배열
    content: [
      {
        type: 'slider',
        autoPlayInterval: 8000
      },
      {
        type: 'info',
        description: {
          ko: `시끄러운 소음과 어두컴컴한 아스팔트 도로, 회색 건물들로 둘러싸인 거친 도시. 바쁜 일상 속에서 우리는 텅 비어 윤곽만 남습니다. 길을 잃은 채 도시를 헤매고 있습니다. 그 틈에서 따스함을 느끼게 하는 빛의 줄기를 발견했습니다. 무의식적으로 빛의 줄기를 따라갑니다.
어둠 속에 가려져 있던 흐릿함은 점점 더 선명해지고 따스함으로 가득 차오릅니다. 내면의 이미지들이 겹쳐지고, 윤곽만 남은 우리의 내면은 더욱 풍요로워집니다.

처음 의뢰인을 만났을 때, 저는 의뢰인이 일상과 사회에 지쳐 방향을 잃었다는 이야기를 들려주었습니다. 그래서 의뢰인은 제 안식처 같은 공간을 만들어보자고 생각했고, 카페부터 시작하기로 했습니다. 
제가 방향을 잃은 것에 대해 이야기하자 의뢰인은 웃으며 지도를 봐도 길을 잘 못 찾는다고, 저는 길을 잘 못 찾는다고 말했습니다. 그래서 저는 카페를 찾는 사람들과 저처럼 누구나 편하게 찾아와 자신만의 시간을 즐길 수 있는 카페를 만들고 싶었습니다. 
이후 프로젝트 디자인 방향을 고민하던 중, 책이나 영화에서 자주 등장하는 이미지가 떠올랐습니다. 길을 잃거나 절망적인 상황에 처했을 때, 한 줄기 빛이 내리고 그 빛을 따라 탈출하는 것이죠. 저는 빛의 의미에 집중했습니다. 
공간의 정문에서 빛이 투과되는 방식을 통해 길을 잃은 사람들을 어떻게 인도할 수 있을까 하는 생각에서 이 프로젝트를 시작했습니다.

기존 공간 레이아웃은 계단 형태의 세 개의 시퀀스로 구성되어 있습니다. 하나의 공간으로 연결되지만, 세 가지 다른 느낌을 줄 수 있습니다. 
1층은 필로티 주차 구조로 되어 있어, 주 출입구를 제외하고는 창문과 문으로 햇빛이 들어오지 않습니다. 낮과 밤의 구분이 없고, 마치 동굴처럼 차갑고 어둡습니다. 보통 어두울 때는 밝은 톤으로 희석하려고 하지만, 공간의 톤앤매너는 차가운 회색과 검은색으로 채워졌습니다. 
빛을 설치함으로써 어둠 속 공간을 표현하고 채웁니다. 강한 빛은 처음에는 압도적으로 느껴질 수 있지만, 어둠 속의 단일 빛은 압도적인 빛 사이로 따뜻함과 스며드는 느낌을 줍니다. 따라서 내부 평면의 중앙 벽을 바리솔로 채워 단일 빛이 파사드까지 깊숙이 스며들도록 했습니다. 
첫 번째 시퀀스의 강한 역광으로 인해 가구의 형태와 다가오는 사람들의 형태만이 공간을 채웁니다. 역광 앞을 지나면 형태의 틀만 남습니다.
 이는 일상과 사회에서 자아를 잃은 사람의 의미를 담고 있습니다. 두 번째 시퀀스부터는 은은한 빛으로 채워집니다. 강렬한 빛의 분위기를 진정시키면서 어두워진 자신을 원래의 색으로 되돌릴 수 있습니다. 세 번째 시퀀스에서는 카운터를 마주하게 됩니다. 
방문객들은 은은한 빛 아래 검은색 원목 가구에 머물게 됩니다. 먹물을 사용하여 가구에 짙은 검은색 마감을 입혔습니다. 그런 다음 바니시 코팅을 통해 어둠 속에서 빛의 색을 입혔습니다. 희미한 빛 속에는 오직 빛과 나만이 존재한다. 
빛을 바라보며 지친 자신에게 위안을 주는 나만의 공간이 되기를 바란다.

카페 이름은 의뢰인이 지어준 것이다. 나처럼 방향 감각을 잃은 사람이라도 누구나 쉽게 찾아올 수 있는 카페를 만들고 싶었다. '길치'는 한국어로 '방향을 잃은 사람'이라는 뜻이다.`,
          en: `In a rough city surrounded by loud noises, dark asphalt roads, and gray buildings. In our busy daily lives, we become empty and only the outline remains.
I'm wandering around the city, lost. In the gap, I discovered a trunk of light that gave me a sense of warmth. I will unconsciously follow the trunk of light. 
The blur hidden in the darkness for me becomes more and more vivid and filled with warmth. 
Our inner images overlap, and our insides, where only the outline remains, become enriched.

When I met my client for the first time, I told him my story of how she was tired of everyday life and society and had lost direction. So she thought of creating a space for myself, like a haven, and decided to start with a cafe As She talk about my loss of direction,
 She laughed and was told that she usually has trouble finding her way even when looking at a map, I'm bad with directions. Therefore, I wanted the cafe to be one that both people visiting the cafe and people like myself could easily visit and enjoy their own time here. Afterwards, as I was thinking about the direction of the project design, 
an image that came to mind appeared in books and movies: when you lose yourself or are in a hopeless situation, a ray of light falls and you follow that light and escape.
 I focused on the meaning of light.I started the project with the idea of how can we guide people who get lost through the penetration of light at the main entrance of the space?

The existing spatial layout consists of three sequences in the form of stairs. It connects to one space, but can give three different feels. Since the first floor consists of a piloti parking structure, Windows and doors do not allow sunlight to enter, except at state entrances. 
There is no difference between day and night; it is cold and dark, like a cave. Usually if it's dark, we try to dilute it with lighter tones, but the tone & manner of the space was instead filled with cold grays and blacks. By installing light, we express and fill the space in the darkness.
 A strong light can feel overwhelming at first, but a single light in the darkness gives a sense of warmth and permeation between the overwhelming. Therefore, we filled the center wall of the interior plane with Barisol, allowing a single light to penetrate all the way to the façade Due to the strong backlighting in the first sequence, 
only the shapes of the furniture and the shapes of the people coming fill the space. When you pass in front of the backlighting, only the frame of the shape remains. It has the meaning of a person who has lost his sense of self in everyday life and society. 
From the second sequence, it is filled with a faint light. While calming the atmosphere of intense light, you can return your darkened self to its original color. In the third sequence you will face a counter. Visitors will linger on black wood furniture under subdued light. 
We used ink stick to create a deep black finish for the furniture. Then, through the varnish coating, I applied the color of light in the darkness. Only the light and myself exist in the dim light I hope it will be your own space where you can look at the light and find comfort for your tired self. 

The cafe name was created by the client. I wanted a cafe that anyone could easily visit, even people who were just as disoriented as I was. 'GILCHI' means 'one who has lost direction' in Korean.`
        },
        details: {
          completion: {
            ko: "Dec, 2022",
            en: "Dec, 2022"
          },
          usage: {
            ko: "dessert cafe",
            en: "dessert cafe"
          },
          projectArea: {
            ko: "60.7 ㎡",
            en: "60.7 ㎡"
          },
          location: {
            ko: "Anjung-eup, Pyeongtaek-si",
            en: "Anjung-eup, Pyeongtaek-si"
          },
          client: {
            ko: "gilchi_coffee",
            en: "gilchi_coffee"
          },
          design: {
            ko: "atelierah, designstudio deef",
            en: "atelierah, designstudio deef"
          },
          photo: {
            ko: "kwon byeong kook",
            en: "kwon byeong kook"
          }
        }
      },
      {
        type: 'layout',
        autoPlayInterval: 5000  // 여러 장일 경우 슬라이드 간격
      },
      // 이미지 행을 여러 개 추가 가능
      // columns: 1, 2, 3 중 선택
      // images: 해당 열 수만큼 이미지 배열
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_02.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_03.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_04.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_05.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_06.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_07.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_08.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_09.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_10.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_11.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_12.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_13.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_14.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_15.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_16.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_18.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_17.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_19.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_20.jpg"
        ]
      }
    ]
  },
  {
    id: 2,
    images: {
      thumbnail: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_02.jpg",
      slider: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_02.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_08.jpg"
      ],
      sketch: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_91.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_92.jpg"
      ],
      layout: ["https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_layout.jpg"]
    },
    title: {
      ko: "norrri ade cafe",
      en: "norrri ade cafe"
    },
    category: {
      ko: "interior",
      en: "interior"
    },
    content: [
      {
        type: 'slider',
        autoPlayInterval: 8000
      },
      {
        type: 'info',
        description: {
          ko: `고즈넉한 작은 집들이 즐비한 청주 운천동 골목. 골목마다 놀이터에 아이들이 모여들었습니다. 이야기도 나누고, 친구들과 뛰어놀고, 하고 싶은 일을 할 수 있는 곳이었습니다. 우리한테는 모든 것이 둥글게 보였습니다. 자유롭고 역동적인 공간이었지만, 그때를 생각하면 마음은 온전히 편안하게 느껴졌습니다.
처음 건축주를 만나 공간에 들어갔을 때, 과거에는 식당인지 짐작할 수 없을 정도로 알 수 없는 칸막이가 설치되어 있었습니다.
곰팡이와 먼지로 둘러싸인 흔적은 오랜 세월 그 자리에 있었던 것 같은 느낌을 주었습니다.
클라이언트께서는 생동감 넘치고 다채로운 색상의 음료와 함께 모두가 편안감을 느낄 수 있는 따뜻한 공간이 되었으면 좋겠다고 하셨습니다.
이야기를 듣다 보니 곡선창 너머로 아이들이 놀고 있는 놀이터가 보였습니다. 그때 바쁜 일상 속에서 저에게 찾아온 옛 추억들 중에는 따뜻함이 있었습니다. 
어린 시절 놀이터에서 놀았던 추억, 평범한 일상의 시간이 다양한 색깔과 감정으로 채워지길 바람으로 프로젝트를 시작하였습니다.

공간은 창밖 놀이터의 일부이고, 우리는 그 연장선으로 조화를 이루는 것이 중요하다고 생각했습니다. 놀이터의 특징인 원색 톤과 자유로운 형태의 느낌을 공간에 담고자 하였습니다. 
그러나 우리는 완전히 생동감 넘치는 놀이터같은 공간 디자인만으로는 고객이 원하는 편안함과 아늑함을 제공하기에는 부족하다고 느꼈습니다.
그러므로 전체적으로 잘 정돈된 톤과 따뜻한 분위기 속에서 컬러풀한 에이드가 공간의 한 요소가 되기를 바랬습니다. 
원색의 가구와 창밖의 풍경이 공간의 중심이 되며, 기존 건물의 곡선형 입면이 자연스럽게 내부와 연결되어 마치 아이들이 놀고 있는 것처럼 내부 공간의 표면이 구르면서 역동적인 생동감을 만들어냈으면 하였습니다.  
역동성과 아늑함, 두가지의 방향성이 공존하는 디자인이 되었으면 하였습니다. 

입구에 들어서면서 대각선 카운터는 공간 활용을 목적으로 하면서도, 마치 공간에 들어오는 손님들에게 장난을 치는 것처럼 배치되어 있습니다.
반대편의 곡선의 벽은 창문을 통해 들어오는 자연광이 곡선을 타고 흐르도록 하여 강한 따뜻함을 주는 동시에, 틈을 통해 보이는 그 뒤의 공간에 대한 호기심을 불러일으키고자 하였습니다. 
내부 바닥은 공원 산책로의 느낌을 이미지하여 역동적인 형태로 디자인하였고, 기존 건물의 버건디 벽돌 외관과 조화를 이루었습니다. 내부와 외부 사이에 따뜻함과 연결성을 더하기 위해 벽돌 타일과 콩자갈 재료가 선택되었습니다.
따뜻한 화이트 컬러는 곡선의 형태와 빛을 더욱 돋보이게 합니다. 원색적인 컬러의 가구와 역동적인 바닥과 조화를 이룹니다.

간단히 말해서, 놀이터는 색상의 유희이자 모양의 향연입니다. 복잡한 모양과 색상의 조합처럼 보이지만 스터디를 통해 선과 절제된 톤으로 단순화했습니다.
브랜딩 로고는 놀이를 아기가 옹알이 하듯 발음한 노리(nori)에서 o이 굴러가는 잔상을 떠오르면서 norrri라는 로고를 구현하게 되었습니다.`,
          en: `An alley in Uncheon-dong, Cheongju, filled with quiet small houses,
 Children gathered at the playground in every alley. It was a place where you could talk, run around with friends, and do what you wanted. 
All the scenery we could see looked round. It was a free and dynamic space, but when we remembered that time, we felt completely at ease.  
When I first met the client and entered the space, There was an unknown partition installed that made it impossible to guess whether it was a dining hall in the past. 
The traces surrounded by mold gave the impression that it had been there for many years. The client said they wanted it to be a warm space where everyone felt comfortable, along with vibrant and colorfully colored drinks. 
While listening to the story, I could see a playground where children were playing outside the curved window. At that time, some of the old memories that came to me during my busy daily life were of warmth. 
I started this project by recalling memories of playing at the playground as a child and how ordinary daily life became filled with various colors and emotions.

The space is part of the playground outside the window, and we thought it was important to create harmony as an extension of it. 
We tried to imbue the space with the impression of primary color tones and free shapes that characterize the playground. However, we felt that including only a fully vibrant play area design was lacking in providing the sense of comfort and coziness that our clients were looking for. 
Therefore, we hope that the colorful ade will become an element of the space under the overall well-organized tone and warm atmosphere. The primary-colored furniture and the scenery outside the window become the center of the space, and the curved facade of the existing building naturally connects with the interior, creating a dynamic sense of life as the surface of the interior space rolls as if children are playing. 
I wanted the design to coexist in two directions: dynamism and comfort.

As you enter the entrance, the diagonal counter is intended to utilize the space, but is arranged as if to play a prank on customers entering the space.  
The diagonal curved shape allows natural light coming through the window to flow through the curve, giving a strong warmth, while also raising questions about the space behind it, visible through the gap. 
The interior floor was designed in a dynamic form, imagining the feel of a park walkway, and harmonized with the burgundy brick exterior of the existing building. Brick tiles and epoxy gravel materials were chosen to add warmth and connection between the interior and exterior. The warm white color makes the curved shape and light stand out more. 
It will harmonize with the primary colored furniture and dynamic flooring. Afterwards, I hope to be able to look out the window and see the disappearing border between the inside and the playground outside the window.

To put it simply, a playground is a play of colors and a feast of shapes. Although it looks like a combination of complex shapes and colors, I simplified it with lines and understated tones throughout the study. 
The branding logo evokes the afterimage of "nori" (the Korean word for play is pronounced as "nori" when pronounced verbally), which is pronounced like a baby cooing, and the "o" rolls down, and embodies the "norrri" logo.`
        },
        details: {
          completion: {
            ko: "Mar, 2023",
            en: "Mar, 2023"
          },
          usage: {
            ko: "ade cafe",
            en: "ade cafe"
          },
          projectArea: {
            ko: "45.2 ㎡",
            en: "45.2 ㎡"
          },
          location: {
            ko: "Uncheon-dong,Cheongju-si",
            en: "Uncheon-dong,Cheongju-si"
          },
          client: {
            ko: "cafe_norrri",
            en: "cafe_norrri"
          },
          design: {
            ko: "atelierah",
            en: "atelierah"
          },
          photo: {
            ko: "kwon byeong kook",
            en: "kwon byeong kook"
          }
        }
      },
      {
        type: 'layout',
        autoPlayInterval: 5000  // 여러 장일 경우 슬라이드 간격
      },
      // 이미지 행을 여러 개 추가 가능
      // columns: 1, 2, 3 중 선택
      // images: 해당 열 수만큼 이미지 배열
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_01.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_03.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_04.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_05.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_06.jpg"
        ]
      },
            {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_08.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_09.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_07.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_10.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_11.jpeg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_13.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_12.jpeg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_13.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_14.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_15.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_16.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_17.jpg"
        ]
      },
      {
        type: 'images',
        columns: 3,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_18.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_19.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/02_norrri_20.jpg"
        ]
      }
    ]
  },
  {
    id: 3,
    images: {
      thumbnail: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_01.jpg",
      slider: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_01.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_02.jpg"
      ],
      sketch: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_91.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_92.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_93.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_94.jpg"
      ],
      layout: ["https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_layout.jpg"]
    },
    title: {
      ko: "all's lounge pub",
      en: "all's lounge pub"
    },
    category: {
      ko: "interior",
      en: "interior"
    },
    content: [
      {
        type: 'slider',
        autoPlayInterval: 8000
      },
      {
        type: 'info',
        description: {
          ko: `사람들은 술자리를 함께하며 "술잔을 나눈다"고 말한다.
술잔은 술을 담는 그릇이지만, 그 모양과 크기, 재질은 술의 종류와 시대, 그리고 사람에 따라 모두 다르다.
어울리는 음식에 따라 투박해지기도, 간결해지기도 한다.
마치 그림을 그릴 때 재료가 달라지면 결과물도 달라지듯, 술과 그림은 닮아 있다.

처음 나누는 술잔과 오랜 시간을 함께한 술잔은 담는 술도, 사람도, 이야기도 다르다.
그러나 그 시간 속에는 공통적으로 자유로움과 편안함이 있다.
캔버스에 색이 채워지듯, 술을 나누는 자리 또한 하나의 그림 같은 공간이 된다.

각자의 취향이 다르고, 어울리는 사람도 다르듯, 자신에게 맞는 화구를 찾는 즐거움이 있다.
그리고 취향이 맞는 사람과 함께할 때 느껴지는 편안함.
비어 있던 술잔은 채워지고, 가지각색의 색들은 하나의 의미를 만들어낸다.

처음 클라이언트를 만났을 때, 그들은 사람들이 부담 없이 소통할 수 있는 술집을 원했다.
가게 주인이든 손님이든, 누구나 편하게 어울릴 수 있는 '소통의 장'이 되길 바랐다.
그래서 프로젝트명 Alls는 "누구나 와서 함께 어울릴 수 있는 술집"이라는 의미를 담고 있다.

디자인 방향을 구상하며, 나는 '작업실'이라는 공간의 의미 속에서 '소통'을 보았다.
위스키, 와인, 맥주 등 다양한 술과 그것을 담는 잔들이 섞여 새로운 맛을 만들어내듯,
화가가 사용하는 붓과 물감에 따라 다양한 화풍이 만들어지는 점에서
이 공간은 마치 예술가의 작업실과 같다고 생각했다.

그래서 '술잔을 나눈다'는 의미와 '가지각색의 색을 담는 하나의 캔버스'를 공간 안에 담고자 했다.
캔버스 같은 공간을 상상하며, 나는 화가의 작업실을 떠올렸다.
이젤과 캔버스, 붓과 다양한 색의 물감, 그리고 작업 중 바닥에 흩뿌려진 페인트 자국들.

그 흔적들을 떠올리다 보니, 강화유리의 파편이 겹쳐졌다.
강화유리는 모서리를 망치로 치면 작은 네모 조각들로 터지며,
그 형태는 마치 바닥 위로 흩어진 페인트 자국처럼 보인다.
브론즈, 블루, 그린빛의 유리를 콩자갈 시공 방식과 섞어 바닥에 알록달록한 색감을 더했고,
투박한 질감을 완화하기 위해 에폭시로 마감했다.

벽은 '빈 캔버스'처럼 비워 두었다.
사람과 사물이 만나며 그 위에 이야기가 그려지고, 술잔이 오가며 공간은 하나의 그림이 된다.
천장은 커다란 천 위에 다양한 색채를 머금은 잔들을 배치하여,
조명이 비출 때 마치 수채화 물감이 묻은 붓이 캔버스에 닿는 순간처럼 느껴지길 바랬다.
다양한 색이 어우러지는 하나의 캔버스 속에서 술잔을 나누는 의미가 공간이 되길 바란다.`,
          en: `People say that they "share a drink" when they drink together.
A glass is a vessel that holds alcohol, yet its shape, size, and material differ depending on the type of drink, the era, and the person who holds it.
According to the accompanying food, it can feel rustic or refined.
Just as the outcome of a painting changes with the artist's materials, so too are drinking and painting alike in spirit.

The first glass one shares and the glass shared after many nights together hold different drinks, people, and stories.
Yet within all those moments lies the same sense of ease and freedom.
As colors fill a canvas, the space where drinks are shared becomes a painting in itself.

Just as every person has their own taste and people they feel at ease with, there is a joy in finding tools that suit oneself.
And when you share time with those whose tastes align, a quiet comfort arises.
An empty glass is filled, and the colors of each person blend into a single meaning.

When I first met the client, they wanted to create a bar where people could communicate freely and comfortably.
Whether owner or guest, anyone should feel welcome—a place for open connection.
Thus, the name Alls was born, meaning "a bar where anyone can come and share time together."

While conceiving the design, I saw communication reflected in the idea of a "studio."
Just as various drinks—whiskey, wine, beer—mix to create new flavors,
different brushes and pigments give birth to diverse styles in painting.
The bar, I thought, could be like an artist's studio—
a space where unique elements coexist and create new expressions.

I wanted to translate the meaning of "sharing a drink" into the idea of
"a single canvas that embraces countless colors."
Imagining a canvas-like space, I recalled the scene of an artist's studio—
easels and canvases, brushes and paints,
and traces of color splattered on the floor during the creative process.

Those traces reminded me of shattered tempered glass.
When struck at the edge, tempered glass breaks into small square fragments,
resembling paint splatters scattered across the ground.
Bronze, blue, and green glass pieces were mixed with pebble-finish flooring,
adding vibrant tones to the floor, while epoxy coating softened the rough texture.

The walls were left bare, like a blank canvas—
a surface waiting to be filled with encounters between people and objects.
As glasses are exchanged, the space itself becomes a living painting.
On the ceiling, colorful glass vessels are arranged beneath the light,
so that when illuminated, it evokes the moment when a brush, soaked in watercolor, touches the canvas.

In this space where countless colors blend into one canvas,
the act of sharing a drink becomes a form of art,
and the space itself becomes a gesture of connection.`
        },
        details: {
          completion: {
            ko: "Aug, 2023",
            en: "Aug, 2023"
          },
          usage: {
            ko: "Casual pub",
            en: "Casual pub"
          },
          projectArea: {
            ko: "42 ㎡",
            en: "42 ㎡"
          },
          location: {
            ko: "Seongbuk, Seoul",
            en: "Seongbuk, Seoul"
          },
          client: {
            ko: "all's lounge",
            en: "all's lounge"
          },
          design: {
            ko: "atelierah",
            en: "atelierah"
          },
          photo: {
            ko: "kwon byeong kook",
            en: "kwon byeong kook"
          }
        }
      },
      {
        type: 'layout',
        autoPlayInterval: 5000  // 여러 장일 경우 슬라이드 간격
      },
      // 이미지 행을 여러 개 추가 가능
      // columns: 1, 2, 3 중 선택
      // images: 해당 열 수만큼 이미지 배열
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_01.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_02.jpg"
        ]
      },
            {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_03.jpg"
        ]
      },
                  {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_04.jpg"
        ]
      },
                        {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_05.jpg"
        ]
      },
                              {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_06.jpg"
        ]
      },
                                    {
        type: 'images',
        columns: 3,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_07.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_08.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_09.jpg"
        ]
      },
                                    {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_10.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_11.jpg"
        ]
      },
                                    {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_12.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_13.jpg"
        ]
      },
                                    {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_14.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/03_pub_15.jpg"
        ]
      },
    ]
  },
  {
    id: 4,
    images: {
      thumbnail: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_03.jpg",
      slider: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_03.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_07.jpg"
      ],
      sketch: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_91.jpg"
      ],
      layout: ["https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_layout.jpg"]
    },
    title: {
      ko: "금촌국밥",
      en: "geumchon gukbap"
    },
    category: {
      ko: "interior",
      en: "interior"
    },
    content: [
      {
        type: 'slider',
        autoPlayInterval: 8000
      },
      {
        type: 'info',
        description: {
          ko: `지나기 전의 하루는 길다. 지나간 후의 하루는 짧다. 빠르게 흘러가는 고단한 일상 속에서 한국에는 빠질수 없는 음식으로 국밥이라고 있다. 국밥은 짧은 휴식과도 같다. 삶에 지친 이들에게 짧은 휴식의 깊이는 한 끼니 이상의 의미를 가진다. 한국의 패스트푸드로 불릴만큼, 짧은 시간안에 든든하게 채울수 있는 음식이다.

클라이언트는 오랜 세월동안 쌓아온 독자적인 돼지머리 고기 레시피로 유명해진 20년 정통 한국 국밥집이다. 다른 지역에서 국밥 한 그릇을 먹기 위해서 직접 찾아올 정도의 깊이와 진미의 음식을 다루신다.
클라이언트는 이제 나이 70대를 바라보는 어머니로, 3남매를 키우기 위해 운영했던 국밥집을 시작하였다. 이제 가족들과 다 함께 운영하고자 확장 공사를 진행을 원하셨다. 
어머니의 인생의 전체로 보았을때 이공간은 동반자이자 아름다운 세월이다 깊게 들어가면 고된 삶을 가족을 위해서 쌓아온 공든 탑의 결과물이 아닐까 싶다.

처음 프로젝트를 시작할때 공간에 접근하는 방식보단 국밥이라는 의미를 고민하였다.
한국영화를 보다 보면 종종 국밥 한 그릇을 앞에 놓고 먹는 장면이 등장한다. 그리고 대체로 국밥에 대한 그들의 마음은 진심이다. 땀을 뻘뻘 흘리며 무언가에 홀린 듯 숟가락을 쉬지 않고 열심히 먹는다. 
대미는 무겁고 투박한 국밥 그릇을 양손으로 움켜잡고 꿀꺽꿀꺽 국물을 들이켜는 장면이다.
국밥은 투박한 옹기안에 어떤 재료든 포용할수 있는 음식이다. 여러 재료를 가마솥에 한데 넣고 펄펄 끓여내 하나의 음식으로 구체화해간다. 
만들어내는 과정은 세월의 깊이와 사람들한테 익숙한 진미를 축적해가며, 한 그릇 국밥만으로도 완전성을 추구해간다. 단순하면서 깊이감은 있어야 하고 화려하면서 담백해야한다. 

새단장 하는 공간이지만 어머님의 오랜 세월과 같이, 흔적이 공간에 배어있길 원하였다.
옹기그릇은 오랜세월 우리나라의 전통 그릇으로 사용되었다. 흙으로 구워낸 옹기그릇은 투박하지만 오랫세월이 지나도 소박함과 호화로움을 같이 지니고 있어 정겨운 마음을 가지게 한다. 
옹기 그릇의 이질적인 특징을 때문에 담긴 내용물의 풍미와 본질을 돋보이게 한다.
옹기그릇과 같은 공간은 무엇일까? 고민을 하였다. 기존 공간의 흔적을 최대로 살리면서 모든 찾아오는 이를 포용할수있는 흙색과 비슷한 컬러인 테라코타 페인트로 공간의 조화를 이루게 하였다. 
담백하면서도 은은한 포인트의 재질로 옻한지를 선택하게 되었다. 옻한지는 한국의 전통 종이로, 옻나무에 상처를 내서 얻는 수액으로 한지에 옻을 칠하면 옻한지가 된다. 
과정은 단순할수 있다. 하지만 칠하고 말리고 네다섯번을 진행 과정에서 균등하지 않고 하나하나 작품의 한지가 탄생이 된다. 균등하지 않는 생산방식은 랜덤으로 컬러와 재질의 패턴과 깊이가 달라진다. 
70장을 선별하고 패턴을 만들었으며, 담백하면서도 화려한 자연스러운 벽을 만들었다.

앞서 말한 국밥은 한국의 패스트음식이다. 가게에 들어서자마자 주문 개수만 외치면 되는 명확함, 주문과 동시에 빠르게 나오는 속도, 숟가락만으로 퍼먹을 수 있는 단순함 이 행위만으로 공간속의 주방과 홀의 호흡의 중요성을 말해준다.
주방은 크게 메인 돼지 머리를 숙성을 시키는 공간, 숙성된 고기를 조리하는 공간, 손님이 나가기전 마무리 준비 하는공간으로 세단계로 구성되길 원하셨다. 
홀은 1인 소비가 많아지고 있는 추세로 1인석, 2인석, 4인석, 6인석까지 배치가 가능한 홀 레이아웃을 원하셨고 테이블마다 중간 파티션을 활용하여 소스와 다른 물품을 두면서 질서를 만들수 있는 테이블을 구성하고자 하였다. 하지만 외부에서 공간을 보았을땐 
공간의 레이아웃은 작게작게 나눠져 있는거 같지만 하나의 그릇에 담긴 각각 호흡들이 조화를 이루며 하나의 숨결이 될수 있는 공간이 되었으면 바람이었다. 
많은 사람들의 수용과 테이블 회전 떄문에 사람과 사람이 맞닿는 부분이 많아져서 답답해 보일수 있는 공간은 높은 층고로 수평적인 공간이 주는 답답함을 기존의 박공구조인 건축구조를 활용하여 수직적인 방향으로 해소를 한다.
그리고 기존 천장 구조에 멍석의 구조물을 설치하였다. 옹기그릇의 특징중 흙으로 빗어내어 미세한 구멍들이 많은 숨을 쉬는 특징에서 영감을 받았다. 숨쉬는 느낌을 조명과 멍석의 작은 구멍으로 투과되는 빛으로 표현하고자 하였다. 
공간에 머무는 사람들에게 아늑한 분위기와 숨통 뚫릴수 있는 천장이 되었으면 하였다. 
한국은 장점이자 단점인 빠른 변화를 가진 나라이다. 흘러가는 삭막한 사회 속에서 이 공간에 들어섰을땐 한국적인 과거의 남겨진 시간에 위로를 받으며
짧은 휴식 아래 각자의 숨결이 배어 하나의 결로 숙성되는 풍요의 향연을 느꼈으면 한다.`,
          en: `Before you even begin a day, it feels long. After one day has passed, the day seems short. In the midst of our fast-paced and busy daily lives, there is one dish that is indispensable. It is Korean soup. We are called Gukbab.
Gukbab can be likened to a short break. For those who are weary of life, a short, deep rest means more than a meal. It is called Korean fast food because it is a food that can satisfy hunger in a short time.

The client is an authentic Gukbab restaurant with 20 years of experience that has become famous for its unique pig head recipe that has been developed over the years.
The food served here is so deep and delicious that other areas would visit in person just to have a bowl of soup. The client is a mother in her 70s who started a soup restaurant to raise her three siblings.
Now, she wanted to proceed with the restaurant expansion so she could run it with his family. When viewed in the context of my mother's life as a whole, this space is companion and beautiful years.

When I first started the project, I was more concerned with the meaning of Gukbab than the method of approaching the space. If you watch Korean movies, you will often see scenes where people eat with a bowl of soup in front of them.
And generally speaking, the love for soup is genuine. As people wiped the sweat from their brows, they seemed drawn to something and ate the Gukbab with all their might, without stopping to eat their spoons.
The highlight is when he grabs the heavy, rough bowl of soup with both hands and drinks it. Gukbab is a food that can be mixed with any ingredient in the rough container.

Various ingredients are put into a large cauldron and simmered until they are fused together into a single dish.
The process of making it accumulates the depth of time and the delicacies familiar to people, and even with just one bowl of soup, the pursuit of perfection continues.
It must be simple yet have depth, it must be flashy yet plain. Although it is a new space, I wanted to see traces of my mother's years permeating the space.

Earthenware bowls have been used as traditional Korean bowls for many years. The clay-fired ware is rough, but even after many years, it still retains a simplicity and elegance. Unchanging vessels give a familiar feeling.
The unique characteristics of the Earthenware Bowl highlight the flavor and essence of the contents. I struggled with how to express the feel of the Earthenware bowl in my mind in the space.

We used terracotta to create a harmonious look while making the most of the traces of the existing space, creating the feel of earthen walls.
The point walls consisted of panels made of lacquer paper. Lacquer paper is a traditional Korean paper, and the lacquer paper is made by applying lacquer to the paper using sap obtained by cutting into the lacquer tree.
The process of making can be simple. The process of applying lacquer to the paper and letting it dry was repeated four or five times. This process results in different colors in the paper and different patterns or depths in the material.
Each piece of lacquer paper becomes a work of art. We selected 70 of them. We created patterns and created a plain yet colorful and natural wall. 

As I said earlier, Gukbap is a Korean fast food.
As soon as you enter the restaurant, the clarity of just having to shout out the number of dishes you want, the speed at which the food comes out as soon as you order, 
and the simplicity of being able to eat it with just a spoon all speak to the importance of the harmony between the kitchen and the dining area within the space.
The kitchen layout is broadly divided into three sections: a space for aging the main pig's head, a space for cooking the aged meat, and a space for finishing preparations before guests serve.
As there is a trend for dining in halls to be more for single-person consumption, clent wanted a hall layout that could accommodate single, double, four, or even six-person seating.
Because the overall space is small, the tables are spaced closely together. At each table border, we placed an auxiliary table to act as a partition, where sauces and accessories necessary for guests can be placed.
The space appears to have many complexly divided boundaries, but by minimizing the number of walls and resolving the issue with furniture, we wanted it to look like one big space when viewed from the outside.
It would be great if the space could become a place where the breath of the visitors and the breath of the restaurant owner harmonize and become one breath.
The space may have seemed cramped due to the large number of people and the way meals are served, but the existing gabled structure of the building has been utilized to create a sense of openness vertically.
Then, a straw mat structure was installed on the existing ceiling. One of the characteristics of Earthenware bowls is that they have tiny holes because they are made from earth, so the bowl has a breathing effect that allows air to circulate well.
I was inspired and wanted to express that breathing feeling through lighting and the light filtering through the small holes in the straw mat. We hope that the ceiling will create a comfortable atmosphere and open air for those staying there.

South Korea's rapid change is both an advantage and a disadvantage. In a busy society,
When you enter this space in the midst of a busy society, we hope you will find solace in the remnants of Korea's past, take a short break, and feel the feast of richness that is ripened together as one.`
        },
        details: {
          completion: {
            ko: "Mar, 2024",
            en: "Mar, 2024"
          },
          usage: {
            ko: "Korean restaurant",
            en: "Korean restaurant"
          },
          projectArea: {
            ko: "227 ㎡",
            en: "227 ㎡"
          },
          location: {
            ko: "Wonpyeong-dong, Gumi",
            en: "Wonpyeong-dong, Gumi"
          },
          client: {
            ko: "금촌 국밥",
            en: "Geumchon Gukbap"
          },
          design: {
            ko: "atelier ah",
            en: "atelier ah"
          },
          construction: {
            ko: "Blackegg",
            en: "Blackegg"
          },
          photo: {
            ko: "park joong kyu",
            en: "park joong kyu"
          }
        }
      },      {
        type: 'layout',
        autoPlayInterval: 5000  // 여러 장일 경우 슬라이드 간격
      },
      // 이미지 행을 여러 개 추가 가능
      // columns: 1, 2, 3 중 선택
      // images: 해당 열 수만큼 이미지 배열
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_01.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_02.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_03.jpg"
        ]
      },
             {
        type: 'images',
        columns: 3,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_04.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_05.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_06.jpg"
        ]
      },
             {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_07.jpg"
        ]
      },
             {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_08.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_09.jpg"
        ]
      },
             {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_10.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_11.jpg"
        ]
      },
             {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_12.jpg"
        ]
      },
             {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_13.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_14.jpg"
        ]
      },
             {
        type: 'images',
        columns: 3,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_15.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_16.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_17.jpg"
        ]
      },
             {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_18.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/04_geumchon_19.jpg"
        ]
      },
    ]
  },
  {
    id: 5,
    images: {
      thumbnail: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_01.jpg",
      slider: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_01.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_02.jpg"
      ],
      sketch: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_91.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_92.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_93.jpg"
      ],
      layout: [ "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_layout1.jpg","https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_layout2.jpg","https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_layout3.jpg"]
    },
    title: {
      ko: "sorcetel office",
      en: "sorcetel office"
    },
    category: {
      ko: "architecture",
      en: "architecture"
    },
    content: [
      {
        type: 'slider',
        autoPlayInterval: 8000
      },
      {
        type: 'info',
        description: {
          ko: `우리는 '백'을 아무것도 없는 것, 비어 있는 것, 무언가로 채울 수 있는 것, 그리고 깨끗한 것으로 바라본다.
백의 풍경은 온갖 빛깔의 확장을 담는 배경이 되며, 모든 것을 포용하는 동시에, 흰빛의 공간을 마주했을 때 특유의 생경함을 불러일으킨다.
백은 단순한 색에 머물지 않는다. 그것은 물질성을 환기하는 질감이며, 여백과도 같은 시간성과 공간성을 품고 있다.

소스텔은 지하무선 중계 시스템과 광대역 라디오 네트워크를 다루며, 국내외를 잇는 통신기업이다. 처음 클라이언트를 만났을 때 받은 인상은 깔끔함과 진보적인 시선이었다.
새롭게 지어질 600평 규모의 사옥은 단순히 연구와 업무를 위한 공간을 넘어, 사람과 기업이 교류하고, 시간을 함께 나누는 열린 장소가 되기를 바랐다.

어떻게 해야 각자의 고유의 색을 가진 사람들이 더 조화롭게 섞일수 있는 공간이 될수 있을까?
일하는 공간은, 어쩌면 집보다 더 오래 머무는 장소이다.
그만큼, 그 공간은 나를 구성하는 일부분이 된다. 그 공간 안에 '백'을 입히고자 했다.
백의 이미지에서 나타나는 생경함은 단편적이지 않고 시간의 흐름에 따라 감정의 도화지와 같이, 머물지 않고 새로운 풍경에서 비롯된다.
그것은 바라보기만 해도 상상의 여지를 열어준다.
흰 종이를 바라보며 보통 "하얗다" 하지 않고 비어진 느낌을 받는다.
공간에 무색이자 백을 부여해, 벽, 가구 주변의 사물을 지우고 각자의 고유한 색을 가진 사람들이 만들어내는 시시각각에 집중한다.
나와 타인의 채워진 여백을 나누고, 조용히 모여 하나의 질서를 구축해나간다.

건축파사드에서도 같은 철학을 이어갔다.
클라이언트는 사옥이 다른 건물보다 눈에 띄기를 원했다. 이에 철골구조 위에 백색 커튼월을 입혔다. 철골구조는 한정된 예산을 고려한 선택이기도 했지만, 구조 자체의 순수함을 드러내는 방식이기도 했다. 단순한 뼈대가 아닌 정제된 우아함을 품고 있다.
규칙적으로 세워진 수직의 커튼월은 빛을 받아 파사드의 깊이를 만들고, 사계절의 변화에 따라 다채로운 표정을 드러낸다. 단순히 건물의 외피가 아니라, 시간과 자연을 끌어들이는 장치가 된다.
현장을 방문했을 때 주변은 강한 색채와 획일적인 창들의 건축 맥락에 둘러싸여 있었다. 그 속에서 가장 눈에 띈 것은 콘크리트 바닥에 버려진 흰 종이였다. 단순한 형태였지만 어떤 색과 형태보다 돋보였다.
단순한 흰종이가 눈에 띄었던 이유도 본질과도 같다. 한순간이 아닌 켜켜이 쌓이는 흐름에는 열어주는 모호한 선이 있다. 강렬함을 가지며, 백을 더 선명히 형성한다.

내부는 기능을 담으면서도 사람을 중심에 두었다.
1층은 연구소와 실험 공간, 2층은 대표실과 메인 오피스, 협력 기업을 위한 업무 공간, 3층은 휴게와 교류를 위한 옥상정원, 헬스장, 개인 작업실이 마련되었다. 층마다 배치된 회의실은 모두가 함께 모이고 소통할 수 있는 중심의 장소가 된다.

공간의 천장은 불가피하게 공조, 조명, 소방 설비등으로 채워질 수밖에 없다. 이러한 기능적 요소들이 드러나기보다는, 사용자의 행위와 고유의 색에 집중할 수 있도록 마감과 형태를 절제하고 숨기고자 하였다.
이에 루버를 선택하였다. 200mm의 깊이의 루버는 하나하나의 선이 입체감을 만들어내고,
그 결을 따라 퍼지는 빛은 마치 천 너머로 스며드는 빛의 잔상과도 같다. 조명은 외형이 드러내기보다 빛 그 자체로 존재하듯 모습은 감춘다. 백의 공간이 가진 깊이에 몰입할 수 있도록 했다.
바닥은 길게 뻗은 장타일로 마감하여 시선을 확장시키고, 공간의 개방감을 한층 강화하였다. 내부의 벽은 마감재 표준 높이를 고려해 재료분리를 하였으며, 백색을 기본으로 하되, 미세한 톤의 짙고 옅음을 달라하여 빛의 방향에 따라 같은 색이면서도 미묘한 경계가 그어진다.

백은 색이라기보다, 색을 볼 수 없는 상태다. 흰색 또는 무색이기에 모순적이며, 그 단순함에서 드러나는 영롱함은 우리를 그저 멍하니 바라보게 만든다.
나는 이를 백의 순수성이라 부른다. 그 안의 자유로움과 자연스러움은, 결국 본질적 미감으로 이어진다. 소스텔 사옥은 그러한 백의 공간 속에서, 사람들의 시간이 모여 새로운 풍경을 만들어가는 공간이 되기를 바란다.`,
          en: `We perceive "white" as the state of nothingness, emptiness, a vessel that can be filled, and a symbol of purity.
The landscape of white becomes a background that embraces all shades of color, while at the same time evoking a peculiar sense of unfamiliarity when faced with its luminous presence.
White is not merely a color. It is a texture that recalls materiality, a spatial and temporal void that contains its own depth and rhythm.

Sostel is a communication company that operates underground relay systems and broadband radio networks, connecting domestic and international signals.
The first impression we had of the client was one of clarity and progressive vision.
Their new 600-pyeong (2,000 m²) headquarters was envisioned not simply as a place for research and work, but as an open ground where people and the company could share time and interact.

How can a space allow people of different characters to harmonize together?
The workplace, in many ways, becomes a place where one spends more time than at home.
It therefore becomes an extension of the self.
Into this space, we sought to infuse white.
The strangeness that emerges from white is not momentary—it unfolds over time, like a canvas of emotions, never still but constantly reshaped by new landscapes.
It opens the possibility of imagination simply through being seen.
When we look at a blank sheet of paper, we rarely say "it's white," but rather, we feel its emptiness.
By giving the space the presence of white—of no color—we erase the dominance of walls, furniture, and objects, and instead focus on the ever-changing hues that people themselves bring.
We share and fill the blankness between ourselves, quietly gathering to form a subtle sense of order.

The same philosophy extends to the building's façade.
The client wanted the headquarters to stand out from its surroundings.
We clad a steel frame structure with a white curtain wall.
While this choice was partly driven by budget constraints, it was also an intentional expression of structural purity—an elegance distilled to its essence.
The rhythmic vertical curtain wall captures light and creates depth across the façade, revealing diverse expressions through the changing seasons.
It becomes not just an exterior skin, but a device that draws time and nature into the building.
When visiting the site, we were surrounded by a context of vivid colors and monotonous windows.
Amid it all, what caught our eye was a single sheet of white paper lying on the concrete floor.
Despite its simplicity, it stood out more than any color or form around it.
Within the flow that accumulates layer by layer, not in a single moment, there lies a faint line that quietly opens up — carrying an intensity that makes the white even more distinct.

Inside, the design places people at the center while accommodating function.
The first floor houses laboratories and testing spaces; the second, the CEO's office, main workspace, and areas for partner companies; the third, a rooftop garden, gym, and private studios for rest and exchange.
Meeting rooms on each level serve as central places for gathering and communication.

Ceilings inevitably carry mechanical systems—HVAC, lighting, sprinklers.
Rather than letting these dominate, we sought to conceal and simplify them, allowing the focus to remain on human activity and expression.
Thus, we introduced louvers.
Each 200mm-deep louver creates a tactile rhythm, and the light diffusing along their lines recalls the residue of sunlight filtering through fabric.
Lighting fixtures were designed to disappear, leaving only the presence of light itself.
The floor is finished with long tiles that visually extend the space, enhancing openness.
Walls are defined by horizontal material divisions aligned to standard heights, primarily in shades of white—subtly varied so that depending on the light, the same surface reveals nuanced tonal boundaries.

White is not a color, but rather the absence of it.
It is paradoxical—colorless yet luminous—and its simplicity draws us into quiet contemplation.
I call this the purity of white: a freedom and naturalness that lead to a fundamental aesthetic.
Within this space of white, we hope that the Sostel headquarters becomes a place where people's time gathers and new landscapes continuously unfold.`
        },
        details: {
          completion: {
            ko: "Mar, 2025",
            en: "Mar, 2025"
          },
          usage: {
            ko: "Office",
            en: "Office"
          },
          projectArea: {
            ko: "2,160 ㎡",
            en: "2,160 ㎡"
          },
          location: {
            ko: "Gwonseon, Suwon",
            en: "Gwonseon, Suwon"
          },
          client: {
            ko: "Sourcetel",
            en: "Sourcetel"
          },
          design: {
            ko: "atelierah",
            en: "atelierah"
          },
          construction: {
            ko: "연성이엔지",
            en: "Yeonsung E&G"
          },
          photo: {
            ko: "park joong kyu",
            en: "park joong kyu"
          }
        }
      },
      {
        type: 'layout',
        autoPlayInterval: 5000
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_01.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_02.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_03.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_04.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_06.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_05.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_07.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_08.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_09.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_10.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_11.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_12.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_13.jpg"
        ]
      },{
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_14.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_15.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_16.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_17.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_18.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_19.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_20.jpg"
        ]
      },
      {
        type: 'images',
        columns: 3,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_21.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_22.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_23.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_24.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_25.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_26.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_27.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_28.jpg"
        ]
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_29.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_30.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_31.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_32.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_33.jpg"
        ]
      },
    ]
  },
  {
    id: 6,
    images: {
      thumbnail: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_01.jpg",
      slider: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_01.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_16.jpg"
      ],
      sketch: [
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_91.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_92.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_93.jpg"
      ],
      layout: ["https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_layout1.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_layout2.jpg",
        "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/05_sorcetel_layout3.jpg"
      ]
    },
    title: {
      ko: "atelier ah",
      en: "atelier ah"
    },
    category: {
      ko: "furniture",
      en: "furniture"
    },
    content: [
      {
        type: 'slider',
        autoPlayInterval: 8000
      },
      {
        type: 'info',
        description: {
          ko: `우리는 '백'을 아무것도 없는 것, 비어 있는 것, 무언가로 채울 수 있는 것, 그리고 깨끗한 것으로 바라본다.
백의 풍경은 온갖 빛깔의 확장을 담는 배경이 되며, 모든 것을 포용하는 동시에, 흰빛의 공간을 마주했을 때 특유의 생경함을 불러일으킨다.
백은 단순한 색에 머물지 않는다. 그것은 물질성을 환기하는 질감이며, 여백과도 같은 시간성과 공간성을 품고 있다.

소스텔은 지하무선 중계 시스템과 광대역 라디오 네트워크를 다루며, 국내외를 잇는 통신기업이다. 처음 클라이언트를 만났을 때 받은 인상은 깔끔함과 진보적인 시선이었다.
새롭게 지어질 600평 규모의 사옥은 단순히 연구와 업무를 위한 공간을 넘어, 사람과 기업이 교류하고, 시간을 함께 나누는 열린 장소가 되기를 바랐다.

어떻게 해야 각자의 고유의 색을 가진 사람들이 더 조화롭게 섞일수 있는 공간이 될수 있을까?
일하는 공간은, 어쩌면 집보다 더 오래 머무는 장소이다.
그만큼, 그 공간은 나를 구성하는 일부분이 된다. 그 공간 안에 '백'을 입히고자 했다.
백의 이미지에서 나타나는 생경함은 단편적이지 않고 시간의 흐름에 따라 감정의 도화지와 같이, 머물지 않고 새로운 풍경에서 비롯된다.
그것은 바라보기만 해도 상상의 여지를 열어준다.
흰 종이를 바라보며 보통 "하얗다" 하지 않고 비어진 느낌을 받는다.
공간에 무색이자 백을 부여해, 벽, 가구 주변의 사물을 지우고 각자의 고유한 색을 가진 사람들이 만들어내는 시시각각에 집중한다.
나와 타인의 채워진 여백을 나누고, 조용히 모여 하나의 질서를 구축해나간다.

건축파사드에서도 같은 철학을 이어갔다.
클라이언트는 사옥이 다른 건물보다 눈에 띄기를 원했다. 이에 철골구조 위에 백색 커튼월을 입혔다. 철골구조는 한정된 예산을 고려한 선택이기도 했지만, 구조 자체의 순수함을 드러내는 방식이기도 했다. 단순한 뼈대가 아닌 정제된 우아함을 품고 있다.
규칙적으로 세워진 수직의 커튼월은 빛을 받아 파사드의 깊이를 만들고, 사계절의 변화에 따라 다채로운 표정을 드러낸다. 단순히 건물의 외피가 아니라, 시간과 자연을 끌어들이는 장치가 된다.
현장을 방문했을 때 주변은 강한 색채와 획일적인 창들의 건축 맥락에 둘러싸여 있었다. 그 속에서 가장 눈에 띈 것은 콘크리트 바닥에 버려진 흰 종이였다. 단순한 형태였지만 어떤 색과 형태보다 돋보였다.
단순한 흰종이가 눈에 띄었던 이유도 본질과도 같다. 한순간이 아닌 켜켜이 쌓이는 흐름에는 열어주는 모호한 선이 있다. 강렬함을 가지며, 백을 더 선명히 형성한다.

내부는 기능을 담으면서도 사람을 중심에 두었다.
1층은 연구소와 실험 공간, 2층은 대표실과 메인 오피스, 협력 기업을 위한 업무 공간, 3층은 휴게와 교류를 위한 옥상정원, 헬스장, 개인 작업실이 마련되었다. 층마다 배치된 회의실은 모두가 함께 모이고 소통할 수 있는 중심의 장소가 된다.

공간의 천장은 불가피하게 공조, 조명, 소방 설비등으로 채워질 수밖에 없다. 이러한 기능적 요소들이 드러나기보다는, 사용자의 행위와 고유의 색에 집중할 수 있도록 마감과 형태를 절제하고 숨기고자 하였다.
이에 루버를 선택하였다. 200mm의 깊이의 루버는 하나하나의 선이 입체감을 만들어내고,
그 결을 따라 퍼지는 빛은 마치 천 너머로 스며드는 빛의 잔상과도 같다. 조명은 외형이 드러내기보다 빛 그 자체로 존재하듯 모습은 감춘다. 백의 공간이 가진 깊이에 몰입할 수 있도록 했다.
바닥은 길게 뻗은 장타일로 마감하여 시선을 확장시키고, 공간의 개방감을 한층 강화하였다. 내부의 벽은 마감재 표준 높이를 고려해 재료분리를 하였으며, 백색을 기본으로 하되, 미세한 톤의 짙고 옅음을 달라하여 빛의 방향에 따라 같은 색이면서도 미묘한 경계가 그어진다.

백은 색이라기보다, 색을 볼 수 없는 상태다. 흰색 또는 무색이기에 모순적이며, 그 단순함에서 드러나는 영롱함은 우리를 그저 멍하니 바라보게 만든다.
나는 이를 백의 순수성이라 부른다. 그 안의 자유로움과 자연스러움은, 결국 본질적 미감으로 이어진다. 소스텔 사옥은 그러한 백의 공간 속에서, 사람들의 시간이 모여 새로운 풍경을 만들어가는 공간이 되기를 바란다.`,
          en: `We perceive "white" as the state of nothingness, emptiness, a vessel that can be filled, and a symbol of purity.
The landscape of white becomes a background that embraces all shades of color, while at the same time evoking a peculiar sense of unfamiliarity when faced with its luminous presence.
White is not merely a color. It is a texture that recalls materiality, a spatial and temporal void that contains its own depth and rhythm.

Sostel is a communication company that operates underground relay systems and broadband radio networks, connecting domestic and international signals.
The first impression we had of the client was one of clarity and progressive vision.
Their new 600-pyeong (2,000 m²) headquarters was envisioned not simply as a place for research and work, but as an open ground where people and the company could share time and interact.

How can a space allow people of different characters to harmonize together?
The workplace, in many ways, becomes a place where one spends more time than at home.
It therefore becomes an extension of the self.
Into this space, we sought to infuse white.
The strangeness that emerges from white is not momentary—it unfolds over time, like a canvas of emotions, never still but constantly reshaped by new landscapes.
It opens the possibility of imagination simply through being seen.
When we look at a blank sheet of paper, we rarely say "it's white," but rather, we feel its emptiness.
By giving the space the presence of white—of no color—we erase the dominance of walls, furniture, and objects, and instead focus on the ever-changing hues that people themselves bring.
We share and fill the blankness between ourselves, quietly gathering to form a subtle sense of order.

The same philosophy extends to the building's façade.
The client wanted the headquarters to stand out from its surroundings.
We clad a steel frame structure with a white curtain wall.
While this choice was partly driven by budget constraints, it was also an intentional expression of structural purity—an elegance distilled to its essence.
The rhythmic vertical curtain wall captures light and creates depth across the façade, revealing diverse expressions through the changing seasons.
It becomes not just an exterior skin, but a device that draws time and nature into the building.
When visiting the site, we were surrounded by a context of vivid colors and monotonous windows.
Amid it all, what caught our eye was a single sheet of white paper lying on the concrete floor.
Despite its simplicity, it stood out more than any color or form around it.
Within the flow that accumulates layer by layer, not in a single moment, there lies a faint line that quietly opens up — carrying an intensity that makes the white even more distinct.

Inside, the design places people at the center while accommodating function.
The first floor houses laboratories and testing spaces; the second, the CEO's office, main workspace, and areas for partner companies; the third, a rooftop garden, gym, and private studios for rest and exchange.
Meeting rooms on each level serve as central places for gathering and communication.

Ceilings inevitably carry mechanical systems—HVAC, lighting, sprinklers.
Rather than letting these dominate, we sought to conceal and simplify them, allowing the focus to remain on human activity and expression.
Thus, we introduced louvers.
Each 200mm-deep louver creates a tactile rhythm, and the light diffusing along their lines recalls the residue of sunlight filtering through fabric.
Lighting fixtures were designed to disappear, leaving only the presence of light itself.
The floor is finished with long tiles that visually extend the space, enhancing openness.
Walls are defined by horizontal material divisions aligned to standard heights, primarily in shades of white—subtly varied so that depending on the light, the same surface reveals nuanced tonal boundaries.

White is not a color, but rather the absence of it.
It is paradoxical—colorless yet luminous—and its simplicity draws us into quiet contemplation.
I call this the purity of white: a freedom and naturalness that lead to a fundamental aesthetic.
Within this space of white, we hope that the Sostel headquarters becomes a place where people's time gathers and new landscapes continuously unfold.`
        },
        details: {
          completion: {
            ko: "Mar, 2025",
            en: "Mar, 2025"
          },
          usage: {
            ko: "Office",
            en: "Office"
          },
          projectArea: {
            ko: "2,160 ㎡",
            en: "2,160 ㎡"
          },
          location: {
            ko: "Gwonseon, Suwon",
            en: "Gwonseon, Suwon"
          },
          client: {
            ko: "Sourcetel",
            en: "Sourcetel"
          },
          design: {
            ko: "atelierah",
            en: "atelierah"
          },
          construction: {
            ko: "연성이엔지",
            en: "Yeonsung E&G"
          },
          photo: {
            ko: "park joong kyu",
            en: "park joong kyu"
          }
        }
      },
      {
        type: 'layout',
        autoPlayInterval: 5000
      },
      {
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_01.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_02.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_03.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_04.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_05.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_06.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_07.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_08.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_09.jpg"
        ]
      },
      {
        type: 'images',
        columns: 3,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_10.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_11.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_12.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_13.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_14.jpg"
        ]
      },
{
        type: 'images',
        columns: 1,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_16.jpg"
        ]
      },
      {
        type: 'images',
        columns: 2,
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_15.jpg",
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/06_atelier_17.jpg"
        ]
      },
    ]
  },
]

