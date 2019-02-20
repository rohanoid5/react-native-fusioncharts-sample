import Areadataset from'../../../../fc-charts/src/dataset/area';import{pluck,pluckNumber,getValidValue,parseUnsafeString,extend2,ZEROSTRING,getMouseCoordinate,HUNDREDSTRING,preDefStr,BLANK,getFirstValue,POSITION_MIDDLE,POSITION_BOTTOM,toRaphaelColor,POINTER,BLANKSTRING,SHAPE_RECT,parseTooltext,BGRATIOSTRING,hasSVG,polyPathToPath,convertColor,getDarkColor,getLightColor,mapSymbolName,getFirstColor,getFirstAlpha}from'../../../../fc-core/src/lib';import{addDep,getDep}from'../../../../fc-core/src/dependency-manager';import dragNodeAnimation from'./dragnode-animation';import raphaelShapesRingpath from'../../../../fc-core/src/_internal/redraphael/redraphael-shapes/redraphael-shapes.ringpath';import KdTree from'../../../../fc-charts/src/dataset/_internal/kdtree';const PADDING=1;let UNDEF,Raphael=getDep('redraphael','plugin'),mathMax=Math.max,mathMin=Math.min,CIRCLE=preDefStr.CIRCLE,POLYGON=preDefStr.POLYGON,RECTANGLE=preDefStr.RECTANGLE,UNDERSCORE=preDefStr.UNDERSCORE,GROUPID=preDefStr.GROUPID,EVENTARGS=preDefStr.EVENTARGS,OBJECTBOUNDINGBOX=preDefStr.OBJECTBOUNDINGBOX,DATAPLOTCLICK='dataplotclick',DEFAULT_CURSOR=preDefStr.DEFAULT,COMMA=preDefStr.COMMA,ROLLOVER='DataPlotRollOver',ROLLOUT='DataPlotRollOut',POSITION_TOP=preDefStr.POSITION_TOP,isVML=!!hasSVG,hideFn=function(){this.hide()},defined=function(a){return a!==void 0&&null!==a},createGroup=(a,b,c,d)=>b.setAnimation({el:'group',attr:{name:a},container:c,component:d}),getPointColor=function(a,b,c){var d,e,f;return a=getFirstColor(a),b=getFirstAlpha(b),e=getLightColor(a,80),f=getDarkColor(a,65),d={FCcolor:{gradientUnits:OBJECTBOUNDINGBOX,color:e+COMMA+f,alpha:b+COMMA+b,ratio:BGRATIOSTRING}},c?1===c?d.FCcolor.angle=0:d.FCcolor.angle=180:(d.FCcolor.cx=.4,d.FCcolor.cy=.4,d.FCcolor.r='50%',d.FCcolor.radialGradient=!0),d},_configureTooltext=function(a,b,c){var d,e=a.setTooltext,f=a.formatedVal,g=b.seriesname,h=a.label,i=a.xValue,j=a.pointLabel,k=b.tooltipSepChar;return void 0===e?void 0===j?null===f?d=!1:(b.seriesNameInToolTip&&(g=getFirstValue(b.seriesname)),d=g?g+k:BLANK,d+=i?i+k:BLANK,d+=f):d=h:d=parseTooltext(e,[3,4,5,6,8,9,10,11],{yaxisName:parseUnsafeString(c.yaxisname),xaxisName:parseUnsafeString(c.xaxisname),yDataValue:f,xDataValue:i,label:h},a,c,b),d};addDep({name:'dragNodeAnimation',type:'animationRule',extension:dragNodeAnimation}),raphaelShapesRingpath(Raphael);class DragNodeDataset extends Areadataset{getName(){return'dragNode'}getType(){return'dataset'}hide(){var a=this,b=a.getLinkedParent(),c={};c.hide=!0,a.setState('dirty',!0),a.setState('visible',!1),b.childChanged(c),a.getFromEnv('chart').getChildren('legend')[0].getItem(a.config.legendItemId).setLegendState('hidden'),a.asyncDraw()}show(){var a=this,b=a.getLinkedParent(),c=a.getFromEnv('legend').getItem(a.config.legendItemId),d={};d.show=!0,a.setState('visible',!0),a.setState('dirty',!0),b.childChanged(d),c&&c.removeLegendState('hidden'),a.asyncDraw()}_setDatasetIndex(){var a=this,b=a.getLinkedParent().getChildren('dataset');a.config.datasetIndex=b.indexOf(a)}pointInShape(a,b,c){var d,e,f,g,h,i=this,j=i.getFromEnv('chart'),k=j.getChildren('canvas')[0],l=k.config,m=c.symbol,n=c._xPos,o=c._yPos;return!(a<l.canvasLeft||a>l.canvasLeft+l.canvasWidth||b<l.canvasTop||b>l.canvasTop+l.canvasHeight)&&('rectangle'===m?(g=c._plotWidth,h=c._plotHeight,n-=g/2,o-=h/2,!!(a>=n&&b>=o&&a<=n+g&&b<=o+h)):(d=(a-n)*(a-n),e=(b-o)*(b-o),f=+c.radius,f*=f,!!(d+e<=f)))}_firePlotEvent(a,b,c){var d,e,f,g=this,h=g.getFromEnv('chart'),i=g.components,j=g.getFromEnv('toolTipController'),k=i.data,l=k[b]||{},m=g.getGraphicalElement('sharedAnchor'),n=l.graphics&&l.graphics.element||(l.config&&l.config.setValue)!==UNDEF&&m,o=this.config.currentToolTip,p=g.config.viewMode,q=g.getLinkedParent(),r=l.graphics.element;n&&(d=l.config,f=d.setLink,e=d.eventArgs,'fc-mouseover'===a?(g._decideTooltipType(b,c),g._rolloverResponseSetter(h,l,c),f&&(n.node.style.cursor=POINTER)):'fc-mouseout'===a?(j.hide(o),g._rolloutResponseSetter(h,l,c),f&&(n.node.style.cursor=DEFAULT_CURSOR)):'fc-click'===a?r.data('fire_click_event')&&h.plotEventHandler(n,c,DATAPLOTCLICK,e):'fc-mousemove'===a?(q.hideWaitElem(),g._decideTooltipType(b,c)):'fc-mousedown'===a?(clearTimeout(r._longpressactive),r.data('fire_click_event',1),p||q.drawWaitingRing(l,g.config.datasetIndex)):'fc-mouseup'===a?(q.hideWaitElem(),q.clearLongPress()):void 0)}dragUp(a){var b=this,c=b.data('drag-options'),d=c.dataset;d._dragUp.call(b,a)}dragMove(a,b){var c=this,d=c.data('drag-options'),e=d.dataset,f=b[0],g=b[1],h=b[2],i=b[3];e._dragMove.call(c,f,g,h,i)}dragStart(a){var b=this,c=b.data('drag-options'),d=c.dataset;d._dragStart.call(b,a)}_dragStart(){var a,b=this,c=b.data('drag-options'),d=c.dataObj,e=d.graphics,f=e.element,g=f.getBBox(),h=d.config,i=c.dataset,j=i.getFromEnv('chart'),k=h.dragStart||(h.dragStart={}),l=d.graphics.cloneGraphic,m=i.getContainer('cloneGraphicGroup'),n=d.graphics.cloneText,o=d.graphics.image,p=d.graphics.cloneImage,q=d.graphics.label;isVML&&(f._.dirty=1),h.allowDrag&&(!l&&d.graphics.element&&(l=d.graphics.cloneGraphic=d.graphics.element.clone(),m.appendChild(l)),q&&!n&&(n=d.graphics.cloneText=d.graphics.label.clone(),n.followers[0]&&n.followers[0].el&&m.appendChild(n.followers[0].el),m.appendChild(n)),o&&!p&&(p=d.graphics.cloneImage=d.graphics.image.clone(),m.appendChild(p)),n&&n.show(),p&&p.show(),l&&l.show()),k.xPos=h._xPos,k.yPos=h._yPos,k.x=h.x,k.y=h.y,k.bBox=g,k.origX=k.lastDx||(k.lastDx=0),k.origY=k.lastDy||(k.lastDy=0),a=f.data(EVENTARGS),j.fireChartInstanceEvent('dataplotdragstart',a),l&&l.show(),n&&n.show(),p&&p.show()}_dragMove(a,b){var c,d=this,e=d.data('drag-options'),f=e.dataObj,g=f.graphics.element,h=f.graphics.cloneGraphic,i=f.graphics.cloneImage,j=f.graphics.cloneText,k=f.config,l=k.dragStart,m=l.bBox.x+a,n=l.bBox.x2+a,o=l.bBox.y+b,p=l.bBox.y2+b,q=e.dataset,r=q.getFromEnv('animationManager'),s=q.getLinkedParent(),t=q.getFromEnv('chartConfig'),u=t.canvasLeft,v=t.canvasRight,w=t.canvasTop,x=t.canvasBottom;m<u&&(a+=u-m),n>v&&(a-=n-v),o<w&&(b+=w-o),p>x&&(b-=p-x),(a||b)&&(g.data('fire_click_event',0),s.hideWaitElem(),s.clearLongPress()),k.allowDrag&&(l.draged=!0,l.lastDx=a,l.lastDy=b,c=e._transformObj={transform:'t'+(l.origX+a)+COMMA+(l.origY+b)},h&&r.setAnimation({el:h,attr:c,component:q}),i&&r.setAnimation({el:i,attr:c,component:q}),j&&r.setAnimation({el:j,attr:{x:k._xPos+a,y:k._yPos+b},component:q}))}_getHoveredPlot(a,b){var c=this.config.tree.getNeighbour({x:a,y:b},!1);if(c)return{pointIndex:c.index||c.i,hovered:!0,pointObj:c.data}}_rolloutResponseSetter(a,b,c){var d=this,e=d.getFromEnv('animationManager'),f=b.config,g=b.graphics.element,h=f.dragStart,i=g.data('unHoverAttr'),j=h&&Object.keys(h).length;j||(('poly'===f.shapeType||f.shapeType===CIRCLE)&&(i.path=polyPathToPath([f.shapeArg.sides,f._xPos,f._yPos,i.r,f.startAngle,0])),f.rollOverProperties.enabled&&e.setAnimation({el:g,attr:i,component:d}),a&&a.plotEventHandler(g,c,ROLLOUT))}_rolloverResponseSetter(a,b,c){var d=this,e=d.getFromEnv('animationManager'),f=b.config,g=b.graphics.element,h=f.dragStart,i=g.data('hoverAttr'),j=h&&Object.keys(h).length;j||(('poly'===f.shapeType||f.shapeType===CIRCLE)&&(i.path=polyPathToPath([f.shapeArg.sides,f._xPos,f._yPos,i.r,f.startAngle,0])),f.rollOverProperties.enabled&&e.setAnimation({el:g,attr:i,component:d}),a&&a.plotEventHandler(g,c,ROLLOVER))}_dragUp(a){var b,c,d,e,f,g,h,j=this,k=j.data('drag-options'),l=k.dataset,m=l.getFromEnv('chart'),n=l.components.data,o=k.dataObj,p=o.graphics.element,q=l.getLinkedParent(),r=o.config,s=o.config.dragStart||{},t=l.getFromEnv('yAxis'),u=o.graphics.cloneText,v=l.getFromEnv('xAxis'),w={},x=l.config.datasetIndex,y=o.graphics.cloneGraphic,z=o.graphics.cloneImage;if(q.hideWaitElem(),q.clearLongPress(),s.draged){for(s.origX+=s.lastDx,s.origY+=s.lastDy,o.config._xPos=s.xPos+s.lastDx,o.config._yPos=s.yPos+s.lastDy,w.x=v.getValue(o.config._xPos),w.y=t.getValue(o.config._yPos),w.update=!0,(d=0,f=n.length);d<f&&(e=n[d],o.config.id!==e.config.id);d++);l.updatePointConfig(w,d),h=p.data(EVENTARGS),h.x=w.x,h.y=w.y,l.parsePlotAttributes(d),l._drawNode(d),b=o.config.startConnectors,c=o.config.endConnectors,q.drawNodeConnectors(b,x),q.drawNodeConnectors(c,x),g=getMouseCoordinate(m.getFromEnv('chart-container'),a),g.sourceEvent='dataplotdragend',m.fireChartInstanceEvent('chartupdated',extend2({sourceEvent:'dataplotdragend'},h),a),m.fireChartInstanceEvent('dataplotdragend',h,a),s.draged=!1,l._setupKdTree()}u&&u.hide(),y&&y.hide(),z&&z.hide(),delete r.dragStart}updatePointConfig(a,b){var c,d=this,e=d.components.data,f=d.config,g=e[b]||{},h=g.config,i=d.getFromEnv('number-formatter'),j=d.getFromEnv('chart-attrib');void 0===h||(h.y=i.getCleanValue(pluck(a.y)),h.x=i.getCleanValue(pluck(a.x)),h._options.x=h.x,h._options.y=h.y,c=i.xAxis(h.x),h.formatedVal=null===h.y?h.y:i.dataLabels(h.y),h.xValue=c,h.toolText=!!f.showTooltip&&_configureTooltext(h,f,j),h.update=a.update)}getNode(a){return a?this.components.nodes[a]:this.components.nodes}configureAttributes(a){if(a)this.trimData(a),this.config.JSONData=a;else if(!a&&!this.config.JSONData)return!1;var b,c,d,e,f,g,h,i,j=this,k=j.config.datasetIndex,l=j.config.JSONData,m=l.data||[],n=j.getFromEnv('chart-attrib'),o=j.getFromEnv('chartConfig'),p=m.length,q=j.config,r=j.getFromEnv('color-manager');for(q.context={},j.components.nodes={},q.showValues=pluckNumber(l.showvalues,n.showvalues,1),i=q.useRoundEdges=pluckNumber(n.useroundedges),q.zIndex=1,q.name=getValidValue(l.seriesname),q.viewMode=pluckNumber(n.viewmode,0),q.id=pluck(l.id,j.index),(0===pluckNumber(l.includeinlegend)||void 0===q.name)&&(q.showInLegend=!1),q.seriesname=parseUnsafeString(l.seriesname),q.includeinlegend=pluckNumber(l.includeinlegend,q.seriesname?1:0),q.showTooltip=pluckNumber(n.showtooltip,1),q.seriesNameInTooltip=pluckNumber(n.seriesnameintooltip,1),q.tooltipSepChar=pluck(n.tooltipsepchar,' - '),c=q.plotFillAlpha=pluck(n.plotfillalpha,HUNDREDSTRING),d=q.showPlotBorder=pluckNumber(n.showplotborder,1),e=q.plotBorderColor=getFirstColor(pluck(n.plotbordercolor,'666666')),f=q.plotBorderThickness=pluckNumber(n.plotborderthickness,i?2:1),g=q.plotBorderAlpha=pluck(n.plotborderalpha,n.plotfillalpha,i?'35':'95'),q.use3DLighting=!!pluckNumber(n.use3dlighting,n.is3d,i?1:0),q.color=getFirstColor(pluck(l.color,r.getPlotColor(k))),q.alpha=pluck(l.plotfillalpha,l.nodeFillAlpha,l.alpha,c),q.datasetShowPlotBorder=!!pluckNumber(l.showplotborder,d),q.datasetPlotBorderColor=getFirstColor(pluck(l.plotbordercolor,l.nodebordercolor,e)),q.datasetPlotBorderThickness=pluckNumber(l.plotborderthickness,l.nodeborderthickness,f),q.datasetPlotBorderAlpha=q.datasetShowPlotBorder?pluck(l.plotborderalpha,l.nodeborderalpha,l.alpha,g):ZEROSTRING,q.datasetAllowDrag=!!pluckNumber(l.allowdrag,1),q.colorObj={fillColor:convertColor(q.color,q.alpha),lineColor:{FCcolor:{color:q.datasetPlotBorderColor,alpha:q.datasetPlotBorderAlpha}}},q.lineWidth=h,q.symbol='poly_4',j.components.data||(j.components.data=[]),j.setState('visible',1===pluckNumber(l.visible,!+l.initiallyhidden,1)),q.yMin=q.yMax=q.xMax=q.xMin=0,j._refreshData=!0,b=0;b<p;b+=1)this._setConfigure(b);j._refreshData=!1,o.showLegend&&j._addLegend(),j._setDatasetIndex(),j.setState('dirty',!0)}_setConfigure(a,b){var c,d,e,f,g,h,i=this,j=i.config.JSONData,k=j.data,l=b||k[a],m=i.components.data,n=i.config,o=m[a]=m[a]||(m[a]={}),p=o.config=o.config||(o.config={}),q=n.id,r=n.yMin||+Infinity,s=n.yMax||-Infinity,t=n.xMax||-Infinity,u=n.xMin||+Infinity,v=n.use3DLighting,w=n.datasetPlotBorderThickness,x=n.datasetPlotBorderColor,y=n.datasetPlotBorderAlpha,z=i.getFromEnv('chart-attrib'),A=n.color,B=n.alpha,C=n.datasetAllowDrag,D=i.getFromEnv('number-formatter');if(o.graphics||(o.graphics={}),p._options=extend2({},l),l||b){if(d=p.y=D.getCleanValue(pluck(l.y)),e=p.x=D.getCleanValue(pluck(l.x)),p.index=a,p.dragStart||(p.dragStart={}),s=mathMax(s,p.y),r=mathMin(r,p.y),t=mathMax(t,p.x),u=mathMin(u,p.x),null===d)p.value=null;else{switch(f=D.xAxis(e),p.formatedVal=null===d?d:D.dataLabels(d),p.setTooltext=getValidValue(parseUnsafeString(pluck(l.tooltext,j.plottooltext,z.plottooltext))),p.pointLabel=pluck(l.label,l.name),g=parseUnsafeString(p.pointLabel),p.label=g,p.name=g,p.displayValue=g,p.xValue=f,b||(p.startConnectors={},p.endConnectors={}),p.toolText=!!n.showTooltip&&_configureTooltext(p,n,z),p.link=l.link,p.id=pluck(l.id,q+preDefStr.UNDERSCORE+a),p.allowDrag=!!pluckNumber(l.allowdrag,C),c=p.shape=getValidValue(pluck(l.shape),preDefStr.RECTANGLE).toLowerCase(),p.height=getValidValue(pluck(l.height),10),p.width=getValidValue(pluck(l.width),10),p.radius=getValidValue(pluck(l.radius),10),p.numSides=getValidValue(pluck(l.numsides),4),p.color=getFirstColor(pluck(l.color,A)),p.borderColor=getFirstColor(pluck(l.bordercolor,x)),p.alpha=pluck(l.alpha,B),p.imageURL=getValidValue(l.imageurl),p.imageNode=!!pluckNumber(l.imagenode),p.imageWidth=l.imagewidth,p.imageHeight=l.imageheight,p.imageAlign=getValidValue(l.imagealign,BLANK).toLowerCase(),p.labelAlign=pluck(l.labelalign,p.imageNode&&defined(p.imageURL)?POSITION_TOP:preDefStr.POSITION_MIDDLE),p.hovercolor=pluck(l.hovercolor,j.hovercolor),p.borderhoveralpha=pluck(l.borderhoveralpha,j.borderhoveralpha),p.borderhovercolor=pluck(l.borderhovercolor,j.borderhovercolor),p.borderhoverthickness=pluck(l.borderhoverthickness,j.borderhoverthickness),p.hoveralpha=pluck(l.hoveralpha,j.hoveralpha),p.hoverheight=pluck(l.hoverheight,j.hoverheight),p.hoverradius=pluck(l.hoverradius,j.hoverradius),p.hoverwidth=pluck(l.hoverwidth,j.hoverwidth),p.shape){case CIRCLE:h=0;break;case POLYGON:h=2,c=mapSymbolName(p.numSides);break;default:h=1;}p.symbol=c,v?(p.fillColor=getPointColor(p.color,p.alpha,h),p.cloneFillColor=getPointColor(p.color,50,h)):(p.fillColor={color:p.color,alpha:p.alpha},p.cloneFillColor=convertColor(p.color,50)),p.colorArr=[{FCcolor:{color:p.color,alpha:p.alpha}},{FCcolor:{color:p.borderColor,alpha:y}}],p.rollOverProperties=i.pointHoverOptions(o,z,{shapeType:h,use3D:v,height:p.height,width:p.width,radius:p.radius,color:p.color,alpha:p.alpha,borderColor:p.borderColor,borderAlpha:y,borderThickness:w})}!p.update&&b&&(p.update=b.update),!p.add&&b&&(p.add=b.add),!0===i._refreshData&&delete o.removed}o.dataset=i,n.xMax=t,n.xMin=u,n.yMin=r,n.yMax=s}pointHoverOptions(a,b,c){var d,e,f,g=this,h=pluckNumber(a.config.showhovereffect,g.config.showhovereffect,b.plothovereffect,b.showhovereffect),i={},j=!!pluck(a.config.hovercolor,g.config.hovercolor,b.plotfillhovercolor,a.config.hoveralpha,g.config.hoveralpha,b.plotfillhoveralpha,a.config.borderhovercolor,g.config.borderhovercolor,b.plotborderhovercolor,a.config.borderhoveralpha,g.config.borderhoveralpha,b.plotborderhoveralpha,a.config.borderhoverthickness,g.config.borderhoverthickness,b.plotborderhoverthickness,a.config.hoverheight,g.config.hoverheight,b.plothoverheight,a.config.hoverwidth,g.config.hoverwidth,b.plothoverwidth,a.config.hoverradius,g.config.hoverradius,b.plothoverradius,h),k=!1;return(void 0===h&&j||h)&&(k=!0,d=pluck(a.config.hovercolor,g.config.hovercolor,b.plotfillhovercolor,getLightColor(c.color,70)),e=pluck(a.config.hoveralpha,g.config.hoveralpha,b.plotfillhoveralpha,c.alpha),i={stroke:convertColor(pluck(a.config.borderhovercolor,g.config.borderhovercolor,b.plotborderhovercolor,c.borderColor),pluckNumber(a.config.borderhoveralpha,g.config.borderhoveralpha,b.plotborderhoveralpha,e,c.borderAlpha)),"stroke-width":pluckNumber(a.config.borderhoverthickness,g.config.borderhoverthickness,b.plotborderhoverthickness,c.borderThickness),height:pluckNumber(a.config.hoverheight,g.config.hoverheight,b.plothoverheight,c.height),width:pluckNumber(a.config.hoverwidth,g.config.hoverwidth,b.plothoverwidth,c.width),r:pluckNumber(a.config.hoverradius,g.config.hoverradius,b.plothoverradius,c.radius)},f=c.use3D?getPointColor(getFirstColor(pluck(a.config.hovercolor,g.config.hovercolor,b.plotfillhovercolor,getLightColor(c.color,70))),pluck(a.config.hoveralpha,g.config.hoveralpha,b.plotfillhoveralpha,c.alpha),c.shapeType):convertColor(d,e),i.fill=toRaphaelColor(f)),{enabled:k,rollOverAttrs:i}}_addLegend(){var a,b=this,c=b.config,d=b.getFromEnv('legend'),e={enabled:c.includeInLegend,type:b.type,anchorSide:4,label:getFirstValue(b.config.JSONData.seriesname)};c.includeinlegend?(a=d.getItem(b.config.legendItemId),a?a.configure({style:d.config.itemStyle,hiddenStyle:d.config.itemHiddenStyle,datasetVisible:d.config.datasetVisible,hoverStyle:d.config.itemHoverStyle}):(b.config.legendItemId=d.createItem(b),a=d.getItem(b.config.legendItemId),b.addExtEventListener('fc-click',function(){a.itemClickFn()},a)),a.configure(e),a.setStateCosmetics('default',{symbol:{fill:toRaphaelColor({color:c.color,alpha:c.alpha}),rawFillColor:c.color,stroke:toRaphaelColor({color:c.plotBorderColor,alpha:HUNDREDSTRING}),"stroke-width":c.anchorBorderThickness}}),b.getState('visible')?a.removeLegendState('hidden'):a.setLegendState('hidden')):b.config.legendItemId&&d.disposeItem(b.config.legendItemId)}createContainer(){var a=this,b=a.getFromEnv('animationManager'),c=a.getLinkedParent().getChildContainer();a.getContainer('nodesGroup')||a.addContainer('nodesGroup',createGroup('nodesGroup',b,c.defaultVcanvasGroup,a)),a.getContainer('dataLabelsGroup')||a.addContainer('dataLabelsGroup',createGroup('dataLabelsGroup',b,c.vcanvasLabelGroup,a)),a.getContainer('cloneGraphicGroup')||a.addContainer('cloneGraphicGroup',createGroup('cloneGraphicGroup',b,c.defaultVcanvasGroup,a))}draw(){var a,b,c,d,e=this,f=e.components,g=e.getFromEnv('smartLabel'),h=f.data,j=e.components.removeDataArr||[],k=j.length,l=e.getFromEnv('dataLabelStyle'),m={fontFamily:l.fontFamily,fontSize:l.fontSize,lineHeight:l.lineHeight,fontWeight:l.fontWeight,fontStyle:l.fontStyle};if(e.getState('dirty')||e._contextChanged()){for(e.createContainer(),c=e.getContainer('nodesGroup'),e.getFromEnv('animationManager').setAnimation({el:e.getContainer('cloneGraphicGroup'),attr:{opacity:.3},component:e}),c.css(m),g.useEllipsesOnOverflow(e.getFromEnv('chartConfig').useEllipsesWhenOverflow),(a=0,b=h.length);a<b;a+=1)d=h[a].removed,d||this._drawNode(a);for(e.config.drawn=!0,a=0;a<k;a++)e._removeDataVisuals(j.shift());e._setupKdTree()}}_setupKdTree(){var a,b,c,d,e,f=this,g=f.config,h=f.components.data,j=-Infinity;for(e=g.searchDataArr=[],a=h.length,b=0;b<a;b++)c=h[b].config,h[b].removed||void 0===c._yPos||isNaN(c._yPos)||(d=c.props.element.attr,j=Math.max(j,pluckNumber(c.radius,0)),e.push({x:pluckNumber(d.x,c._xPos),y:pluckNumber(d.y,c._yPos),index:b,data:h[b],shapeInfo:{type:c.shape,radius:pluck(c.radius,0),width:pluckNumber(c.width),height:pluckNumber(c.height),sides:pluckNumber(c.numSides)}}));g.tree=new KdTree(!0).buildKdTree(e),g.tree._setSearchLimit(j,j)}drawLabel(a){var b,c,d,e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z=this,A=z.getFromEnv('chart'),B=z.config.datasetIndex,C=z.getFromEnv('animationManager'),D=z.components.data,E=D.length,F=z.getContainer('nodesGroup'),G=z.getFromEnv('chartConfig'),H=z.getFromEnv('dataLabelStyle'),I=z.dragUp,J=z.dragMove,K=z.dragStart,L=z.getFromEnv('smartLabel'),M=z.getState('visible');for(L.setStyle(H),void 0===a?b=0:(b=a,E=b+1);b<E;b++)if(l=D[b],e=l.config,r=e._plotWidth,s=e._plotHeight,f=e.displayValue,t=e.labelAlign,u=l.graphics,q=u.cloneText,v=l.config.rollOverProperties,w=e.shapeType,M&&(defined(f)||f!==BLANK)){switch(L.useEllipsesOnOverflow(G.useEllipsesWhenOverflow),h=L.getSmartText(f,r-PADDING,s-PADDING),j=.5*s-.5*h.height,t){case POSITION_TOP:j=-j;break;case POSITION_BOTTOM:break;default:j=0;}n=e._xPos,x=e._yPos,l._yAdjustment=m=j,o=x+m,g=e.link?POINTER:e.allowDrag?'move':BLANKSTRING,c={text:h.text,title:h.tooltext||BLANKSTRING,fill:H.color,"text-bound":[H.backgroundColor,H.borderColor,H.borderThickness,H.borderPadding,H.borderRadius,H.borderDash],x:n,y:o,cursor:g},d=u.label,d=C.setAnimation({el:d||'text',attr:c,container:F,component:z}),u.label?d.show():(d=z.addGraphicalElement('plotLabel',d,!0),u.label=d,d.drag(J,K,I)),y=u&&(u.image||u.element),y&&d.insertAfter(y),q&&C.setAnimation({el:q,attr:{transform:BLANKSTRING,x:n,y:o,text:h.text,title:h.tooltext||BLANKSTRING,fill:H.color,"text-bound":[H.backgroundColor,H.borderColor,H.borderThickness,H.borderPadding,H.borderRadius,H.borderDash]},component:z}),d.data('drag-options',{dataObj:l,dataset:z,datasetIndex:B,pointIndex:l.config.index,cursor:g,chart:A,link:l.link}),k={index:b,link:e.link,y:e.y,x:e.x,shape:pluck(w,'rect'),width:e.width,height:e.height,radius:e.radius,sides:e.numSides,label:e.displayValue,toolText:e.toolText,id:e.id,datasetIndex:B,datasetName:z.config.JSONData.seriesname,sourceType:'dataplot'},p=B+'_'+b,d.data(GROUPID,p),d.data(EVENTARGS,k),d.data('hoverAttr',v&&v.rollOverAttrs),d.data('unHoverAttr',y.data('unHoverAttr'))}else u.label&&u.label.hide()}parsePlotAttributes(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y=this,z=y.config.datasetIndex,A=y.components,B=A.nodes,C=y.getFromEnv('xAxis'),D=y.getFromEnv('yAxis'),E=A.data,F=E[a],G=F.config,H=y.config,I=F.graphics||(F.graphics={}),J=G.symbol,K=H.colorObj.lineColor,L=H.datasetPlotBorderThickness,M=F.config.rollOverProperties,N=G.shape,O=G.link?POINTER:G.allowDrag?'move':BLANKSTRING,P=I.cloneImage;if(G._yPos=c=D.getPixel(G.y),G._xPos=b=C.getPixel(G.x),void 0!==c&&!isNaN(c)){if(G.shapeArg={},i=G.shapeArg,e=pluckNumber(G.height),d=pluckNumber(G.width),f=pluckNumber(G.radius),n=J===RECTANGLE,g=G.id,h=G.imageNode,j=G.imageURL,k=G.imageAlign,l=n?d:1.4*f,o=pluckNumber(G.imageWidth,l),m=n?e:1.4*f,p=pluckNumber(G.imageHeight,m),s=toRaphaelColor(G.fillColor),G._plotWidth=l,G._plotHeight=m,r={fill:s,"stroke-width":L,stroke:toRaphaelColor(K)},J=i.symbol=pluck(G.symbol,H.symbol,BLANK),J=J.split(UNDERSCORE),u=[J[1],b,c,G.radius,G.startAngle,0],'poly'===J[0]||J[0]===CIRCLE?(G.shapeType=J[0],G.elemType='path',v={path:polyPathToPath(u)},i.x=b,i.y=c,i.radius=G.radius,i.sides=J[1],r.r=G.radius,delete r.width,delete r.x,delete r.y,delete r.height,M&&M.enabled&&(t=M.rollOverAttrs,delete t.x,delete t.y,delete t.width,delete t.height)):(G.shapeType=SHAPE_RECT,G.elemType='rect',i.x=b-d/2,i.y=c-e/2,i.r=0,i.width=d,i.height=e,v={x:i.x,y:i.y,width:d,height:e,r:0},r.width=d,r.height=e,r.x=b-d/2,r.y=c-e/2,M&&M.enabled&&(t=M.rollOverAttrs,t.x=b-t.width/2,t.y=c-t.height/2,delete t.r)),v.fill=s,v['stroke-width']=L,v.stroke=toRaphaelColor(K),G.eventArgs={index:a,link:G.link,y:G.y,x:G.x,shape:pluck(N,'rect'),width:d,height:e,radius:f,sides:G.numSides,label:G.displayValue,toolText:G.toolText,id:G.id,datasetIndex:z,datasetName:y.config.JSONData.seriesname,sourceType:'dataplot'},h&&j){switch(p>m&&(p=m),o>l&&(o=l),k){case POSITION_MIDDLE:q=c-p/2;break;case POSITION_BOTTOM:q=m>p?c+m/2-p:c-p/2;break;default:q=m>p?c-.5*m:c-p/2;}G.imageX=b-o/2,G.imageY=q,G.imageWidth=o,G.imageHeight=p,x={src:j,x:G.imageX,y:q,width:o,height:p,cursor:O},P&&(w={transform:BLANKSTRING,src:j,x:G.imageX,y:q,width:o,height:p})}G.pointAttr=r,B[g]=F,G.props={element:{attr:v},imageElement:{attr:x},cloneImage:{attr:w},cloneGraphic:{attr:v}}}}allocatePosition(a){var b,c,d=this,e=d.components.data;if(c=e.length,void 0!==a)d.parsePlotAttributes(a);else for(b=0;b<c;b++)d.parsePlotAttributes(b)}_drawNode(a){var b,c,d=this,e=d.getFromEnv('chart'),f=d.config.datasetIndex,g=d.getLinkedParent(),h=d.components,i=d.getFromEnv('animationManager'),j=h.data,k=j[a],l=k.config,m=k.graphics||(k.graphics={}),n=l.imageNode,o=l.imageURL,p=d.getContainer('nodesGroup'),q=k.config.rollOverProperties,r=d.dragUp,s=d.dragMove,t=d.dragStart,u=l.link?POINTER:l.allowDrag?'move':BLANKSTRING,v=m.graphic,w=m.cloneText,x=m.cloneGraphic,y=m.cloneImage,z=m.image,A=m.label,B=d.getState('visible');l._yPos===void 0||isNaN(l._yPos)?(m.element&&(m.element=i.setAnimation({el:m.element,component:d})),m.image&&(m.image=i.setAnimation({el:m.image,component:d})),m.label&&(m.label=i.setAnimation({el:m.label,component:d}))):(v=m.element,c=v&&v.type,-1===l.elemType.indexOf(c)&&v&&(v.remove(),v=m.element=null,A&&A.remove(),z&&z.remove(),delete m.label,delete m.image,z=null,A=null),v=i.setAnimation({el:v||l.elemType,label:'node',attr:l.props.element.attr,container:p,component:d}),!m.graphic&&v.drag(s,t,r),m.element=v,v.show(),g.animationDone=!0,b=f+'_'+a,x&&(x.type===v.type?i.setAnimation({el:x,attr:l.props.element.attr,component:d}).transform(BLANKSTRING):(x.remove(),delete k.graphics.cloneGraphic,w&&(w.remove(),delete k.graphics.cloneText))),n&&o?(z=i.setAnimation({el:m.image||'image',attr:B&&l.props.imageElement.attr,doNotRemove:!0,container:p,component:d,callback:!B&&hideFn}),!m.image&&z&&z.drag(s,t,r),m.image=z,B&&z.show(),z.data('drag-options',{dataObj:k,dataset:d,datasetIndex:d.index,pointIndex:k.config.index,cursor:u,link:k.link}),z.data(GROUPID,b),z.data(EVENTARGS,l.eventArgs),z.data('hoverAttr',q&&q.rollOverAttrs),z.data('unHoverAttr',l.pointAttr),y&&i.setAnimation({el:y,attr:l.props.cloneImage.attr,component:d})):m.image&&(m.image=i.setAnimation({el:m.image,component:d})),d.drawLabel(a),i.setAnimation({el:v,attr:{cursor:u},component:d}),v.data('drag-options',{dataObj:k,dataset:d,datasetIndex:d.index,pointIndex:k.config.index,cursor:u,chart:e,link:k.link}),v.data(GROUPID,b),v.data(EVENTARGS,l.eventArgs),v.data('hoverAttr',q&&q.rollOverAttrs),v.data('unHoverAttr',l.pointAttr),B?v.show():v.hide())}trimData(a){if(this.config.JSONData){let b=this,c=b.components,d=c.data&&c.data.length,e=a.data&&a.data.length||0,f=d-e;0<f&&b.removeData(e,f)}}removeData(a,b){var c=this,d=c.components,e=c.getLinkedParent(),f=d.data,g=d.removeDataArr||(d.removeDataArr=[]);b=b||1,a=a||0,0>a&&(a=0),d.removeDataArr=g=g.concat(f.splice(a,b)),e._clearConnectors()}_removeDataVisuals(a){var b,c,d,e=this;if(a)for(b in c=a.graphics,c)d=c[b],d.hide&&'function'==typeof d.hide&&(e.getFromEnv('animationManager').setAnimation({el:d,attr:{"text-bound":[]},component:e}),d.hide(),d.transform&&d.transform(BLANKSTRING))}getJSONData(){var a,b,c=this,d=c.components.data,e=d.length,f=[];for(b=0;b<e;b++)a=d[b],!a.removed&&a.config._options&&(delete a.config._options.update,delete a.config._options.add,f.push(a.config._options));return f}}export default DragNodeDataset;