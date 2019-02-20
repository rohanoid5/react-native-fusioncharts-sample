import{SmartRenderer}from'../../../../fc-core/src/component-interface';import{extend2,pluck,pluckNumber,DEFAULT_FT_FONT}from'../../../../fc-core/src/lib';import isValidNumber from'../../../../fc-utils/src/type/is-valid-number';const anchorRadius=3,defaultTagWidth=29,GUTTER_5=5,M='M',L='L',h='h',v='v',z='z';class ReferenceLine extends SmartRenderer{constructor(){super(),this.hoverInHandler=()=>{this.setState('hovered',!0),this.asyncDraw()},this.hoverOutHandler=()=>{this.setState('hovered',!1),this.asyncDraw()}}__setDefaultConfig(){super.__setDefaultConfig(),this.config.defaultStyle={fill:'#B70000',text:{fill:'#5F5F5F',verticalalign:'top',"font-family":DEFAULT_FT_FONT,"font-size":'11px'},marker:{fill:'#B70000',stroke:'#B70000',borderthickness:0,borderpadding:2,borderradius:0,borderdash:'none',strokewidth:'1'}},this.config.direction='right'}configureAttributes(a={}){super.configureAttributes(a);let b=this,c=b.config,d=b.getFromEnv('getStyleDef'),e=a.referenceLine||{};c.direction=pluck(a.direction,c.direction),c.style=d(e.style),c.label=pluck(e.label,''),c.value=pluckNumber(e.value,0),a.yScale&&(c.yScale=a.yScale),a.formatterFn&&(c.formatterFn=a.formatterFn),a.prefix&&(c.prefix=a.prefix),a.suffix&&(c.suffix=a.suffix)}getPathArr(){let a,b=this,c=b.config,d=c.direction,e=b.getLinkedParent().config,f=c.yScale,g=f.getDomain(),h=c.value,i=[];return isValidNumber(g[0])&&isValidNumber(g[1])&&h>=g[0]&&h<=g[1]&&(a=f.getRangeValue(h),'left'===d||'right'===d?i=['M',e.canvasLeft+e.borderConfig.leftBorder,a,'H',e.canvasWidth]:'top'===d||'bottom'===d?i=['M',a,e.canvasTop,'V',e.canvasHeight-e.borderConfig.bottomBorder]:void 0),i}getLabelsProps(a){let b=this.config,c=b.direction,d={isValidLabel:!1};return a.length&&b.label&&(d.isValidLabel=!0,'top'===c?(d.x=a[1],d.y=a[2],d.textAnchor='start'):'bottom'===c?(d.x=a[1],d.y=a[4],d.textAnchor='start'):'left'===c?(d.x=a[1],d.y=a[2],d.textAnchor='start'):'right'===c?(d.x=a[4],d.y=a[2],d.textAnchor='end'):void 0),d}draw(){let a,b,c,d,e,f,g=this,i=g.config,j=i.value,k=g.getFromEnv('smartLabel'),l=g.getLinkedParent().config,m=l.canvasLeft,n=g.getFromEnv('textStyle'),o=i.defaultStyle,p=i.style,q=i.label;g.addGraphicalElement({el:'group',container:{id:'thermo',label:'group',isParent:!0},component:g,label:'refLine',attr:{name:'reference-line-group'},id:`refLine-${g.getId()}`},!0),c=extend2(extend2(extend2({},{text:n}),o),p),d=g.getPathArr(),e=g.getLabelsProps(d),d=g.getPathArr(),d.length&&(g.addGraphicalElement({el:'path',attr:{path:d,"stroke-width":c.marker.strokewidth,stroke:c.fill},container:{label:'refLine'},component:g,label:'line'},!0),g.addGraphicalElement({el:'circle',attr:{cx:d[4]+anchorRadius,cy:d[2],r:anchorRadius,fill:c.fill,"stroke-width":g.getState('hovered')?1:0,stroke:'#595959'},container:{label:'refLine'},component:g,label:'anchor'}),g.getState('hovered')&&(e.isValidLabel&&g.addGraphicalElement({el:'text',attr:{text:q,x:e.x-c.marker.borderpadding-1,y:e.y-c.marker.borderpadding*('top'===c.text.verticalalign?-1:1),"font-family":c.text['font-family'],"font-weight":c.text['font-weight'],"font-size":c.text['font-size'],fill:c.text.fill,"text-anchor":e.textAnchor,"vertical-align":c.text.verticalalign,"text-bound":[c.fill,c.fill,c.marker.borderthickness,c.marker.borderpadding,c.marker.borderradius,c.marker.borderdash,.2]},container:{label:'refLine'},component:g,label:'label'},!0),k.setStyle({fontFamily:c.text['font-family'],fontWeight:c.text['font-weight'],fontSize:c.text['font-size'].toLowerCase().split('px')[0]}),b=i.yScale.getRangeValue(j),a=k.getSmartText(j),f=a.width+2*c.marker.borderpadding,f=f>defaultTagWidth?f:defaultTagWidth,g.addGraphicalElement({el:'path',attr:{path:[M,m+l.borderConfig.leftBorder,b,L,m-GUTTER_5,b,L,m-10,b-a.height/2-2*c.marker.borderpadding,h,-f,v,a.height+4*c.marker.borderpadding,h,f,L,m-GUTTER_5,b,z],fill:c.fill,stroke:c.fill},container:{label:'refLine'},component:g,label:'tag'},!0),g.addGraphicalElement({el:'text',attr:{text:i.formatterFn({value:j,type:'referenceline',prefix:i.prefix,suffix:i.suffix}),x:m-10-f/2,y:b,"font-family":c.text['font-family'],"font-weight":c.text['font-weight'],"font-size":c.text['font-size'],fill:'#F3F3F3',"text-anchor":'middle'},container:{label:'refLine'},component:g,label:'tag-text'},!0)))}}export default ReferenceLine;