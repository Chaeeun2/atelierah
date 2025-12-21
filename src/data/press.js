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
          ko: `시끄러운 소음과 어두컴컴한 아스팔트 도로, 회색 건물들로 둘러싸인 거친 도시. 바쁜 일상 속에서 우리는 텅 비어 윤곽만 남습니다. 길을 잃은 채 도시를 헤매고 있습니다. 그 틈에서 따스함을 느끼게 하는 빛의 줄기를 발견했습니다. 무의식적으로 빛의 줄기를 따라갑니다...`,
          en: `In a rough city surrounded by loud noises, dark asphalt roads, and gray buildings. In our busy daily lives, we become empty and only the outline remains. I'm wandering around the city, lost. In the gap, I discovered a trunk of light that gave me a sense of warmth...`
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
