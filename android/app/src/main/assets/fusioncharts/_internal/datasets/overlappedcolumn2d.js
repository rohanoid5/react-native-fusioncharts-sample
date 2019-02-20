import{pluckNumber}from'../lib/lib';import Column from'./column';let UNDEF;function checkOverlap(a,b){let c,d,e,f,g=a.y,h=a.height;for(c=0,d=b.length;c<d;c++)if(f=b[c].height,e=b[c].y,b[c].labelShown&&g+h>=e&&e+f>=g)return!0;return!1}class OverlappedColumn extends Column{constructor(){super(),this._labeldimensionMap={}}drawLabel(a,b){var c,d,e,f,g,h,k,l,m,n,o,p,q,r=this,s=r.getFromEnv('chart'),t=r.getFromEnv('animationManager'),u=s.config,v=r.getFromEnv('xAxis'),w=r.getFromEnv('paper'),x=r.getState('visible'),y=s.getFromEnv('smartLabel'),z=s.config.dataLabelStyle,A=r.config,B=v.getTicksLen(),C=r.components,D=C.data,E=C.pool,F=u.rotatevalues?270:0,G={},H=r.getJSONIndex(),I=r.getSkippingInfo&&r.getSkippingInfo(),J=I&&I.skippingApplied,K=I&&I.labelDraw||[],L=K.length,M=pluckNumber(a,0),N=pluckNumber(b,J?L:B),O=L===Math.abs(N-(M+1)),P=function(){this.attr({"text-bound":[]}),this.hide()},Q=function(){this.show()};for(q=r.getContainer('labelGroup'),q.css({fontFamily:z.fontFamily,fontSize:z.fontSize,fontWeight:z.fontWeight,fontStyle:z.fontStyle}),q.show(),y.useEllipsesOnOverflow(s.config.useEllipsesWhenOverflow),y.setStyle(z),g=M;g<N;g++){if(f=J&&O?K[g]:g,d=D[f],l=d&&d.config,k=l&&l.setValue,d===UNDEF||k===UNDEF||null===k||!0===l.labelSkip){l&&delete l.labelSkip,o=d&&d.graphics,o&&o.label&&o.label.hide();continue}if(h=d.graphics,!!h){if(m=l.showValue,p=s.getDatasets().map(a=>a.getJSONIndex()<H&&a._labeldimensionMap[g]).filter(Boolean),A.showValues&&(G={x:l.props.label.attr.x,y:l.props.label.attr.y,width:l._state.labelWidth,height:l._state.labelHeight},c=checkOverlap(G,p)),r._labeldimensionMap[g]=G,!m||null===k||c){h.label&&t.setAnimation({el:h.label,component:r,doNotRemove:!0,callback:P,label:'plotLabel'}),r._labeldimensionMap[g].labelShown=!1;continue}e=l.props.label.attr,e.transform=w.getSuggestiveRotation(F,e.x,e.y),!(n=h.label)&&E&&E.label[0]&&(n=h.label=E.label[0],E.label.splice(0,1)),n=t.setAnimation({el:h.label||'text',attr:e,component:r,label:'plotLabel',index:f,container:q,callback:x?Q:P}),r._labeldimensionMap[g].labelShown=!!x,h.label||(h.label=r.addGraphicalElement('plotLabel',n,!0))}}A.labelDrawn=!0}}export default OverlappedColumn;