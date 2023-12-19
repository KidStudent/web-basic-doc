import nodata from '../../components/assets/img/common/nodata.png';
import nodataDark from '../../components/assets/img/common/nodata-dark.png';
import nodataImg from '../../components/assets/img/common/nodata-img.png';

export const emptyJSX = `
<div class="no-data">
    <img class="no-data-img" src=${nodata} />
    <div class='null-data-text'>暂无数据</div>
</div>
`;
export const emptyJSXDark = `
<div class="no-data">
    <img class="no-data-img" src=${nodataDark} />
    <div class='null-data-text'>暂无数据</div>
</div>
`;
export const emptyJSXImg = `
<div class="no-data">
    <img class="no-data-img" src=${nodataImg} />
    <div class='null-data-text'>暂无数据</div>
</div>
`;
