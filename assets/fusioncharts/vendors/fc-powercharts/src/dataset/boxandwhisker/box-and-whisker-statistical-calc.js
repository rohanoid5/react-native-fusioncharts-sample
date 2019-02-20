import{ComponentInterface}from'../../../../fc-core/src/component-interface';import{BLANKSTRING,BLANK,defined,COMMASTRING}from'../../../../fc-core/src/lib';class BoxAndWhiskerStatisticalCalc extends ComponentInterface{setArray(a){var b,c,d=this,e=d.getFromEnv('number-formatter'),f=0;for(a||(a=BLANK),c=a.replace(/\s/g,BLANK).split(COMMASTRING),b=this.dataLength=c&&c.length;b--;)f+=c[b]=e.getCleanValue(c[b]);c&&c.sort(function(c,a){return c-a}),this.values=c,this.mean=f/this.dataLength,this.getFrequencies()}getQuartiles(){var a,b,c,d,e,f,g=Math.ceil,h=Math.floor,i=Math.round,j=this.values,k=this.dataLength,l=k%2,m=BLANKSTRING;return'tukey'===m?l?(a=(k+3)/4,c=(3*k+1)/4):(a=(k+2)/4,c=(3*k+2)/4):'mooremccabe'===m?l?(a=(k+1)/4,c=3*a):(a=(k+2)/4,c=(3*k+2)/4):'freundperles'===m?(a=(k+3)/4,c=(3*k+1)/4):'mendenhallsincich'===m?(a=i((k+1)/4),c=i(3*a)):(a=(k+1)/4,c=3*a),a-=1,c-=1,b=h(a),d=h(c),e=a-b?j[b]+(j[g(a)]-j[b])*(a-b):j[a],f=c-d?j[d]+(j[g(c)]-j[d])*(c-d):j[c],this.quartiles={q1:e,q3:f}}getMinMax(){var a=this.values;return{min:a[0],max:a[this.dataLength-1]}}getMean(){return this.mean}getMD(){for(var a,b=this.mean,c=this.frequencies,d=c.length,e=0;d--;)a=c[d],e+=a.frequency*Math.abs(a.value-b);return e/this.dataLength}getSD(){for(var a=this.mean,b=this.values,c=this.dataLength,d=c,e=0;c--;)e+=Math.pow(b[c]-a,2);return Math.sqrt(e/(d-1))}getQD(){return .5*(this.quartiles.q3-this.quartiles.q1)}getFrequencies(){var a,b,c,d=[],e=this.dataLength,f=this.values,g=0;for(c=0;c<e;c+=1)g+=a=f[c],defined(d[c])?d[c].frequency+=1:(b={},b.value=a,b.frequency=1,d[c]=b);this.sum=g,this.frequencies=d}getMedian(){var a=this.dataLength,b=.5*a,c=this.values;return 0==a%2?(c[b]+c[b-1])/2:c[Math.floor(b)]}}export default BoxAndWhiskerStatisticalCalc;