import ScaleTimeBin from'../../../../../../fc-utils/src/scales/time-bin';import Linear from'../../../../../../fc-core/src/axis/scales/linear';import Log from'../../../../../../fc-core/src/axis/scales/log';import{extent}from'../../../../../../fc-core/src/lib';import getAtomicity from'../../_utils/atomicity';import timeFormatter from'../../../../../../fc-utils/src/time-converter';const TYPES={time:ScaleTimeBin,numeric:Linear,log:Log},SHARE_RATIO=.8;export default(a=>{let b=a.config,c=b.focusAxesX,d=b.contextAxesX||[],e=b.dataTable,f=e.getSchema(),g=a.getFromEnv('chartWidth'),h=[0,SHARE_RATIO*g/c.length],i=({type:a,plot:b})=>{let c=TYPES[a]||TYPES.time,d=new c;return d.setBinMin(getAtomicity(f[e.indexOf(b[0].value)].format,e.getMinDiff(b[0].value))),d.setBinRange?d.setBinRange(h):d.setRange(h),d},j=({value:a})=>{const b=e.min(a),c=e.max(a);return[b,c]};a.addToEnv('contextScalesX',d.map(i)),a.addToEnv('focusScalesX',c.map(i));const{focus:k,context:l}=(a=>{let b,c=a.plot.map(j),d=extent([].concat(...c),Number),e=a.plot[0].value,g=a.format||f.find(({name:a})=>a===e).format,h=timeFormatter.parser(g),i=(a,b)=>{let c=h.parse(a);return null===c?b:c<b?+c:b},k=(a,b)=>{let c=h.parse(a);return null===c?b:c>b?+c:b};return d[0]=i(a.min,d[0]),d[1]=k(a.max,d[1]),b=d.slice(),b[0]=k(a.activestart,b[0]),b[1]=i(a.activeend,b[1]),b=extent(b),{focus:b,context:d}})(d[0]);a.setContextLimit(l),a.setFocusLimit(k)});