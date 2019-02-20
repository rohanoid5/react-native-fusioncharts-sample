import merge from'ramda/es/merge';import{componentFactory,BLANKSTRING,extend2,pluck}from'../../../../../fc-core/src/lib';import Axis from'../../../_internal/components/axis';import Canvas from'../../../_internal/components/canvas';import panelConfig from'./_utils/panel-configurer';import usConfig from'../../../../../fc-utils/src/number-converter/locales/en-US';const DEFAULT_AXIS_X={orientation:'bottom',align:'bottom',tickpadding:2,visible:!0,overlap:!1,domainline:!1,style:{text:{major:{fill:'#818181'},context:{fill:'#818181'}}}},DEFAULT_AXIS_Y={orientation:'left',align:'left',tickarguments:[4,'s'],ticksize:0,tickpadding:7,visible:!0,overlap:!1,domainline:!1,style:{text:{major:{"font-size":'11px'}},ticks:{major:{stroke:'#efefef'}}}},getSpecifier=function(a,b){return'axis'===a?'log'===b?'$~s':'$s':'tooltip'===a?'$.2s':'crossline'===a?'$.2s':'referenceline'===a?'$.1~s':void 0},hydrateX=merge(DEFAULT_AXIS_X),hydrateY=merge(DEFAULT_AXIS_Y),visibleAxes=a=>a.visible,isLeftAligned=a=>'left'===a.align,isRightAligned=a=>'right'===a.align,isTopAligned=a=>'top'===a.align,isBottomAligned=a=>'bottom'===a.align,mergeBorderConfig=a=>{const b={leftBorder:!1,rightBorder:!1,topBorder:!1,bottomBorder:!1},{xConfigs:c,yConfigs:d}=a;return(c.find(isLeftAligned)||d.find(isLeftAligned))&&(b.leftBorder=!0),(c.find(isRightAligned)||d.find(isRightAligned))&&(b.rightBorder=!0),(c.find(isTopAligned)||d.find(isTopAligned))&&(b.topBorder=!0),(c.find(isBottomAligned)||d.find(isBottomAligned))&&(b.bottomBorder=!0),merge(a,b)};export default(a=>{const b=a.config,c=b.focusAxesX,d=b.focusAxesY,e=b.focusPanels.map(a=>merge(a,{x:a.x.map(a=>{let b=c[a.index],d=pluck(c[a.index].format,{});return b.timeFormatterFn='function'==typeof d.formatter?d.formatter:a=>b.scale.getFormattedTime&&b.scale.getFormattedTime(a),merge(hydrateX(a),panelConfig(c,a.index))}),y:a.y.map(a=>{let b=d[a.index],c=pluck(d[a.index].format,{});return b.formatLabelPrefix=c.prefix||BLANKSTRING,b.formatLabelSuffix=c.suffix||BLANKSTRING,b.scale.setLocale(extend2(extend2({},usConfig),{prefix:b.formatLabelPrefix,suffix:b.formatLabelSuffix})),b.formatterFn='function'==typeof c.formatter?c.formatter:e=>{let f;return f='string'==typeof c.formatter?c.formatter:getSpecifier(e.type,d[a.index].type),b.scale.tickFormat(4,f)(e.value)},merge(hydrateY(a),panelConfig(d,a.index))})})),f=a.config.canvasAxisMap;e.forEach(({x:b,y:c,plots:d},e)=>{const g=`canvas_${e}`;f[g]||(f[g]={x:[],y:[]}),b.filter(visibleAxes).forEach((b,c)=>{const d=`axesX_${e}_${c}`;f[g].x.push(d),componentFactory(a,Axis,d,1,[b])}),c.filter(visibleAxes).forEach((b,c)=>{const d=`axesY_${e}_${c}`;'log'===b.type&&(b.tickarguments=[4,'~s']),f[g].y.push(d),componentFactory(a,Axis,d,1,[b])}),componentFactory(a,Canvas,g,1,[mergeBorderConfig({plotConfigs:d,tableMap:a.config.focusTableMap,xConfigs:b,yConfigs:c,enableGridLines:!0,enableMouseTracking:1,enableMarkers:1,enableInteraction:1})])}),b.focusPanels=e});