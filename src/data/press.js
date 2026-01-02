// Press 데이터 (국문/영문)
// type: "link" (외부 링크) 또는 "detail" (상세페이지)
// image: 썸네일 이미지
// media: 매체명
// project: 프로젝트명 (국문/영문)
// link: 외부 링크 URL (type이 "link"일 때 사용)
// content: 상세페이지 내용 (type이 "detail"일 때 사용)

export const pressItems = [
  {
    id: 1,
    type: "detail",
    image: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/press_06.jpg",
    media: "brique magazine",
    project: {
      ko: "norrri cafe",
      en: "norrri cafe"
    },
    // 상세페이지 내용
    content: [
      {
        type: 'hero',
        images: [
          "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/01_gilchi_01.jpg"
        ],
        autoPlayInterval: 8000
      },
      {
        type: 'description',
        text: {
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
        }
      },
      {
        type: 'info',
        details: {
          projectName: {
            ko: "norrri cafe",
            en: "norrri cafe"
          },
          media: {
            ko: "brique magazine",
            en: "brique magazine"
          },
          published: {
            ko: "Dec, 2022",
            en: "Dec, 2022"
          }
        }
      },
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
      }
    ]
  },
  {
    id: 2,
    type: "link",
    image: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/press_05.jpg",
    media: "archdaily",
    project: {
      ko: "norrri cafe",
      en: "norrri cafe"
    },
    link: "https://www.archdaily.com/1007047/norrri-cafe-atelier-ah?ad_medium=office_landing&ad_name=article"
  },
    {
    id: 3,
    type: "link",
    image: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/press_07.jpg",
    media: "onoffice magazine",
    project: {
      ko: "norrri cafe",
      en: "norrri cafe"
    },
    link: "https://www.onofficemagazine.com/interiors/atelier-ah-interior-norrri-cafe-south-korea"
  },
  {
    id: 4,
    type: "link",
    image: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/press_04.jpg",
    media: "architonic",
    project: {
      ko: "norrri cafe",
      en: "norrri cafe"
    },
    link: "https://www.architonic.com/en/pr/norrri-cafe/20747549/"
  },
  {
    id: 5,
    type: "link",
    image: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/press_03.jpg",
    media: "interiors",
    project: {
      ko: "gilchi cafe",
      en: "gilchi cafe"
    },
    link: "ttps://blog.naver.com/interiorskorea/223579180866"
  },
  {
    id: 6,
    type: "link",
    image: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/press_02.jpg",
    media: "archdaily",
    project: {
      ko: "금촌국밥",
      en: "geumchon gukbap"
    },
    link: "https://www.archdaily.com/1024640/geumchon-gukbab-korean-restaurant-atelier-ah?ad_medium=office_landing&ad_name=article"
  },
  {
    id: 7,
    type: "link",
    image: "https://pub-4b716c374bc747948e9ac588042939de.r2.dev/press_01.jpg",
    media: "yinjispace magazine",
    project: {
      ko: "금촌국밥",
      en: "geumchon gukbap"
    },
    link: "https://yinjispace.com/article/Atelier-AH-Geumchon-Gukbab-Korean-Restaurant.html"
  }
]
