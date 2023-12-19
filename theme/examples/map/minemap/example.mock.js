import redFence from '/images/map/minemap/red-fence.png';
import greenFence from '/images/map/minemap/green-fence.png';
import blueFence from '/images/map/minemap/blue-fence.png';
import warningPosition from '/images/map/minemap/warning-position.png';

const mapEditDataMock = [
  {
    id: 1,
    type: 'Feature',
    kind: 'red',
    properties: {
      lineColor: '#F61C35',
      fillColor: '#F61C35',
      fillOpacity: 0.2,
      fillOutlineColor: '#F61C35',
      fillOutlineWidth: 2,
      isLock: true,
      custom_style: 'true',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [120.465828, 32.533069],
          [120.468515, 32.534381],
          [120.46998, 32.532282],
          [120.467324, 32.530908],
          [120.465828, 32.533069],
        ],
      ],
    },
    fenceImgUrl: redFence,
  },
  {
    id: 2,
    type: 'Feature',
    kind: 'green',
    properties: {
      lineColor: '#49FBD3',
      fillColor: '#49FBD3',
      fillOpacity: 0.2,
      fillOutlineColor: '#49FBD3',
      fillOutlineWidth: 2,
      isLock: true,
      custom_style: 'true',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [120.466307, 32.537685],
          [120.469146, 32.539252],
          [120.469523, 32.53875],
          [120.469523, 32.53875],
          [120.471136, 32.538194],
          [120.467354, 32.536174],
          [120.466307, 32.537685],
        ],
      ],
    },
    fenceImgUrl: greenFence,
  },
  {
    id: 3,
    type: 'Feature',
    kind: 'blue',
    properties: {
      lineColor: '#37E5FF',
      fillColor: '#37E5FF',
      fillOpacity: 0.2,
      fillOutlineColor: '#37E5FF',
      fillOutlineWidth: 2,
      isLock: true,
      custom_style: 'true',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [120.46706, 32.556076],
          [120.469683, 32.55657],
          [120.4713, 32.55479],
          [120.467761, 32.554341],
          [120.46706, 32.556076],
        ],
      ],
    },
    fenceImgUrl: blueFence,
  },
  {
    id: 4,
    type: 'Feature',
    kind: 'blue',
    properties: {
      lineColor: '#37E5FF',
      fillColor: '#37E5FF',
      fillOpacity: 0.2,
      fillOutlineColor: '#37E5FF',
      fillOutlineWidth: 2,
      isLock: true,
      custom_style: 'true',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [120.490838, 32.538595],
          [120.491557, 32.538888],
          [120.491611, 32.538439],
          [120.491103, 32.538237],
          [120.490838, 32.538595],
        ],
      ],
    },
    fenceImgUrl: blueFence,
  },
  {
    id: 5,
    type: 'Feature',
    kind: 'blue',
    properties: {
      lineColor: '#37E5FF',
      fillColor: '#37E5FF',
      fillOpacity: 0.2,
      fillOutlineColor: '#37E5FF',
      fillOutlineWidth: 2,
      isLock: true,
      custom_style: 'true',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [120.47087, 32.537774],
          [120.471112, 32.537877],
          [120.471413, 32.537302],
          [120.471413, 32.537302],
          [120.47087, 32.537774],
        ],
      ],
    },
    fenceImgUrl: blueFence,
  },
  {
    id: 7,
    type: 'Feature',
    kind: 'red',
    properties: {
      lineColor: '#F61C35',
      fillColor: '#F61C35',
      fillOpacity: 0.2,
      fillOutlineColor: '#F61C35',
      fillOutlineWidth: 2,
      isLock: true,
      custom_style: 'true',
    },
    geometry: {
      coordinates: [
        [
          [120.46610539854002, 32.53577955594519],
          [120.46610539854002, 32.53107386514961],
          [120.47901921613597, 32.53107386514961],
          [120.47901921613597, 32.53577955594519],
          [120.46610539854002, 32.53577955594519],
        ],
      ],
      type: 'Polygon',
    },
    fenceImgUrl: redFence,
  },
];

const pointBuildListMock = [
  {
    id: 1,
    title: '海安市政府',
    kind: 'red',
    lng: 120.467735,
    lat: 32.532712,
    icon: 'redPoint',
  },
  {
    id: 2,
    title: '书香园小区',
    kind: 'green',
    lng: 120.468946,
    lat: 32.537649,
    icon: 'greenPoint',
  },
  {
    id: 3,
    title: '江苏省海安高级中学',
    kind: 'blue',
    lng: 120.468851,
    lat: 32.555493,
    icon: 'bluePoint',
  },
  {
    id: 4,
    title: '王府大酒店',
    kind: 'blue',
    lng: 120.491374,
    lat: 32.538508,
    icon: 'bluePoint',
  },
  {
    id: 5,
    title: '智达教育(海安校区)',
    kind: 'blue',
    lng: 120.471218,
    lat: 32.537631,
    icon: 'bluePoint',
  },
  {
    id: 7,
    title: '123',
    kind: 'red',
    lng: 120.472562307338,
    lat: 32.5334267105474,
    icon: 'redPoint',
  },
];

const alarmPointListMock = [
  {
    lnglat: [120.456101, 32.53736],
    id: '1',
    title: `一级`,
    similarity: 85.5,
    alarmLevel: '一级',
    name: '陶尚华',
    taskLibName: '人脸测试布控库001',
    alarmTime: '2023-11-23 09:24:09',
    deviceName: 'B_QN1077延安路东南(结构化2)_(一期)',
    alarmPicUrl: '/images/map/minemap/default-photo.png',
    taskPicUrl: '/images/map/minemap/default-photo.png',
    messageType: 'faceAlarms',
  },
];

const layerTypeListMock = [
  { layerName: '蓝色图层', layerType: 'blue', color: '#37E5FF', checked: true },
  { layerName: '红色图层', layerType: 'red', color: '#FF7979', checked: true },
  { layerName: '绿色图层', layerType: 'green', color: '#49FBD3', checked: true },
  { layerName: '预警信息', layerType: 'warningInfo', icon: warningPosition, checked: true },
];

export { mapEditDataMock, pointBuildListMock, alarmPointListMock, layerTypeListMock };
