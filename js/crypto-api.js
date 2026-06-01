// Self-contained: SHA-1, MD2, RIPEMD-128/160/256/320
// Exposes globals: sha1, md2, ripemd128, ripemd160, ripemd256, ripemd320
!function(w){'use strict';
function toBytes(v){
  if(typeof v==='string'){
    var b=[],i,c;
    for(i=0;i<v.length;i++){
      c=v.charCodeAt(i);
      if(c<0x80){b.push(c);}
      else if(c<0x800){b.push(0xc0|(c>>6),0x80|(c&63));}
      else if(c<0xd800||c>0xdfff){b.push(0xe0|(c>>12),0x80|((c>>6)&63),0x80|(c&63));}
      else{c=0x10000+((c-0xd800)*1024)+(v.charCodeAt(++i)-0xdc00);b.push(0xf0|(c>>18),0x80|((c>>12)&63),0x80|((c>>6)&63),0x80|(c&63));}
    }
    return new Uint8Array(b);
  }
  if(v instanceof ArrayBuffer)return new Uint8Array(v);
  return(v instanceof Uint8Array)?v:new Uint8Array(v);
}
function toHex(b){var s='',i;for(i=0;i<b.length;i++)s+=('0'+b[i].toString(16)).slice(-2);return s;}
function wrap(Ctor){
  function m(v){return m.update(v).hex();}
  m.update=function(v){
    var h=new Ctor();h.feed(toBytes(v));
    var ch={update:function(v2){h.feed(toBytes(v2));return ch;},hex:function(){return toHex(h.done());},array:function(){return Array.from(h.done());}};
    return ch;
  };
  m.array=function(v){var h=new Ctor();h.feed(toBytes(v));return Array.from(h.done());};
  return m;
}

// ── SHA-1 ─────────────────────────────────────────────────────────────────
function SHA1(){this.h=[0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476,0xC3D2E1F0];this.buf=[];this.len=0;}
SHA1.prototype={
  blockSize:64,
  feed:function(data){var i;for(i=0;i<data.length;i++){this.buf.push(data[i]);if(this.buf.length===64){this._cmp();this.buf=[];}}this.len+=data.length;},
  _cmp:function(){
    var W=[],i,f,k,t,a,b,c,d,e,buf=this.buf;
    for(i=0;i<16;i++)W[i]=(buf[i*4]<<24)|(buf[i*4+1]<<16)|(buf[i*4+2]<<8)|buf[i*4+3];
    for(i=16;i<80;i++){var x=W[i-3]^W[i-8]^W[i-14]^W[i-16];W[i]=(x<<1)|(x>>>31);}
    a=this.h[0];b=this.h[1];c=this.h[2];d=this.h[3];e=this.h[4];
    for(i=0;i<80;i++){
      if(i<20){f=(b&c)|(~b&d);k=0x5A827999;}
      else if(i<40){f=b^c^d;k=0x6ED9EBA1;}
      else if(i<60){f=(b&c)|(b&d)|(c&d);k=0x8F1BBCDC;}
      else{f=b^c^d;k=0xCA62C1D6;}
      t=(((a<<5)|(a>>>27))+f+e+k+W[i])|0;
      e=d;d=c;c=(b<<30)|(b>>>2);b=a;a=t;
    }
    this.h[0]=(this.h[0]+a)|0;this.h[1]=(this.h[1]+b)|0;this.h[2]=(this.h[2]+c)|0;this.h[3]=(this.h[3]+d)|0;this.h[4]=(this.h[4]+e)|0;
  },
  done:function(){
    var g=new SHA1();g.h=this.h.slice();g.len=this.len;
    var buf=this.buf.slice(),len=this.len,i;
    buf.push(0x80);while(buf.length%64!==56)buf.push(0);
    var bHi=Math.floor(len/0x20000000),bLo=(len*8)>>>0;
    buf.push((bHi>>>24)&255,(bHi>>>16)&255,(bHi>>>8)&255,bHi&255,(bLo>>>24)&255,(bLo>>>16)&255,(bLo>>>8)&255,bLo&255);
    for(i=0;i<buf.length;i+=64){g.buf=buf.slice(i,i+64);g._cmp();}
    var out=new Uint8Array(20);
    for(i=0;i<5;i++){out[i*4]=(g.h[i]>>>24)&255;out[i*4+1]=(g.h[i]>>>16)&255;out[i*4+2]=(g.h[i]>>>8)&255;out[i*4+3]=g.h[i]&255;}
    return out;
  }
};

// ── MD2 ───────────────────────────────────────────────────────────────────
var MD2S=[41,46,67,201,162,216,124,1,61,54,84,161,236,240,6,19,98,167,5,243,192,199,115,140,152,147,43,217,188,76,130,202,30,155,87,60,253,212,224,22,103,66,111,24,138,23,229,18,190,78,196,214,218,158,222,73,160,251,245,142,187,47,238,122,169,104,121,145,21,178,7,63,148,194,16,137,11,34,95,33,128,127,93,154,90,144,50,39,53,62,204,231,191,247,151,3,255,25,48,179,72,165,181,209,215,94,146,42,172,86,170,198,79,184,56,210,150,164,125,182,118,252,107,226,156,116,4,241,69,157,112,89,100,113,135,32,134,91,207,101,230,45,168,2,27,96,37,173,174,176,185,246,28,70,97,105,52,64,126,15,85,71,163,35,221,81,175,58,195,92,249,206,186,197,234,38,44,83,13,110,133,40,132,9,211,223,205,244,65,129,77,82,106,220,55,200,108,193,171,250,36,225,123,8,12,189,177,74,120,136,149,139,227,99,232,109,233,203,213,254,59,0,29,57,242,239,183,14,102,88,208,228,166,119,114,248,235,117,75,10,49,68,80,180,143,237,31,26,219,153,141,51,159,17,131,20];
function MD2(){this.st=new Uint8Array(48);this.cs=new Uint8Array(16);this.L=0;this.buf=[];}
MD2.prototype={
  blockSize:16,
  feed:function(data){var i;for(i=0;i<data.length;i++){this.buf.push(data[i]);if(this.buf.length===16){this._cmp(this.buf);this.buf=[];}}},
  _cmp:function(blk){
    var i,j,t;
    for(i=0;i<16;i++){this.st[16+i]=blk[i];this.st[32+i]=blk[i]^this.st[i];}
    t=0;for(i=0;i<18;i++){for(j=0;j<48;j++){t=this.st[j]^=MD2S[t];}t=(t+i)%256;}
    var L=this.L;for(i=0;i<16;i++){this.cs[i]^=MD2S[blk[i]^L];L=this.cs[i];}this.L=L;
  },
  done:function(){
    var g=new MD2();g.st=new Uint8Array(this.st);g.cs=new Uint8Array(this.cs);g.L=this.L;g.buf=this.buf.slice();
    var padLen=16-g.buf.length,i,pad=[];
    for(i=0;i<padLen;i++)pad.push(padLen);
    g._cmp(g.buf.concat(pad));g._cmp(Array.from(g.cs));
    return new Uint8Array(g.st.slice(0,16));
  }
};

// ── RIPEMD shared tables ──────────────────────────────────────────────────
var ML=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8,3,10,14,4,9,15,8,1,2,7,0,6,13,11,5,12,1,9,11,10,0,8,12,4,13,3,7,15,14,5,6,2,4,0,5,9,7,12,2,10,14,1,3,8,11,6,15,13];
var MR=[5,14,7,0,9,2,11,4,13,6,15,8,1,10,3,12,6,11,3,7,0,13,5,10,14,15,8,12,4,9,1,2,15,5,1,3,7,14,6,9,11,8,12,2,10,0,4,13,8,6,4,1,3,11,15,0,5,12,2,13,9,7,10,14,12,15,10,4,1,5,8,7,6,2,13,14,0,3,9,11];
var SL=[11,14,15,12,5,8,7,9,11,13,14,15,6,7,9,8,7,6,8,13,11,9,7,15,7,12,15,9,11,7,13,12,11,13,6,7,14,9,13,15,14,8,13,6,5,12,7,5,11,12,14,15,14,15,9,8,9,14,5,6,8,6,5,12,9,15,5,11,6,8,13,12,5,12,13,14,11,8,5,6];
var SR=[8,9,9,11,13,15,15,5,7,7,8,11,14,14,12,6,9,13,15,7,12,8,9,11,7,7,12,7,6,15,13,11,9,7,15,11,8,6,6,14,12,13,5,14,13,13,7,5,15,5,8,11,14,14,6,14,6,9,12,9,12,5,15,8,8,5,12,9,12,5,14,6,8,13,6,5,15,13,11,11];
var KL5=[0,0x5A827999,0x6ED9EBA1,0x8F1BBCDC,0xA953FD4E];
var KR5=[0x50A28BE6,0x5C4DD124,0x6D703EF3,0x7A6D76E9,0];
var KL4=[0,0x5A827999,0x6ED9EBA1,0x8F1BBCDC];
var KR4=[0x50A28BE6,0x5C4DD124,0x6D703EF3,0];
function fL(j,x,y,z){if(j<16)return x^y^z;if(j<32)return(x&y)|(~x&z);if(j<48)return(x|~y)^z;if(j<64)return(x&z)|(y&~z);return x^(y|~z);}
function fR5(j,x,y,z){if(j<16)return x^(y|~z);if(j<32)return(x&z)|(y&~z);if(j<48)return(x|~y)^z;if(j<64)return(x&y)|(~x&z);return x^y^z;}
function fR4(j,x,y,z){if(j<16)return(x&z)|(y&~z);if(j<32)return(x|~y)^z;if(j<48)return(x&y)|(~x&z);return x^y^z;}
function ld(buf){var X=new Int32Array(16),i;for(i=0;i<16;i++)X[i]=buf[i*4]|(buf[i*4+1]<<8)|(buf[i*4+2]<<16)|(buf[i*4+3]<<24);return X;}
function leOut(h,n){var out=new Uint8Array(n*4),i;for(i=0;i<n;i++){out[i*4]=h[i]&255;out[i*4+1]=(h[i]>>8)&255;out[i*4+2]=(h[i]>>16)&255;out[i*4+3]=(h[i]>>24)&255;}return out;}
function ripemdPad(buf,len){
  var b=buf.slice();b.push(0x80);while(b.length%64!==56)b.push(0);
  var bHi=Math.floor(len/0x20000000),bLo=(len*8)>>>0;
  b.push(bLo&255,(bLo>>8)&255,(bLo>>16)&255,(bLo>>24)&255,bHi&255,(bHi>>8)&255,(bHi>>16)&255,(bHi>>24)&255);
  return b;
}

// ── RIPEMD-160 ────────────────────────────────────────────────────────────
function RIPEMD160(){this.h=[0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476,0xC3D2E1F0];this.buf=[];this.len=0;}
RIPEMD160.prototype={
  blockSize:64,
  feed:function(data){var i;for(i=0;i<data.length;i++){this.buf.push(data[i]);if(this.buf.length===64){this._cmp();this.buf=[];}}this.len+=data.length;},
  _cmp:function(){
    var X=ld(this.buf),i,r,t,al,bl,cl,dl,el,ar,br,cr,dr,er;
    al=this.h[0];bl=this.h[1];cl=this.h[2];dl=this.h[3];el=this.h[4];
    ar=this.h[0];br=this.h[1];cr=this.h[2];dr=this.h[3];er=this.h[4];
    for(i=0;i<80;i++){
      r=i>>4;
      t=(al+fL(i,bl,cl,dl)+X[ML[i]]+KL5[r])|0;t=(((t<<SL[i])|(t>>>(32-SL[i])))+el)|0;
      al=el;el=dl;dl=(cl<<10)|(cl>>>22);cl=bl;bl=t;
      t=(ar+fR5(i,br,cr,dr)+X[MR[i]]+KR5[r])|0;t=(((t<<SR[i])|(t>>>(32-SR[i])))+er)|0;
      ar=er;er=dr;dr=(cr<<10)|(cr>>>22);cr=br;br=t;
    }
    t=(this.h[1]+cl+dr)|0;
    this.h[1]=(this.h[2]+dl+er)|0;this.h[2]=(this.h[3]+el+ar)|0;
    this.h[3]=(this.h[4]+al+br)|0;this.h[4]=(this.h[0]+bl+cr)|0;this.h[0]=t;
  },
  done:function(){
    var g=new RIPEMD160();g.h=this.h.slice();g.len=this.len;
    var buf=ripemdPad(this.buf,this.len),i;
    for(i=0;i<buf.length;i+=64){g.buf=buf.slice(i,i+64);g._cmp();}
    return leOut(g.h,5);
  }
};

// ── RIPEMD-128 ────────────────────────────────────────────────────────────
function RIPEMD128(){this.h=[0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476];this.buf=[];this.len=0;}
RIPEMD128.prototype={
  blockSize:64,
  feed:function(data){var i;for(i=0;i<data.length;i++){this.buf.push(data[i]);if(this.buf.length===64){this._cmp();this.buf=[];}}this.len+=data.length;},
  _cmp:function(){
    var X=ld(this.buf),i,r,t,al,bl,cl,dl,ar,br,cr,dr;
    al=this.h[0];bl=this.h[1];cl=this.h[2];dl=this.h[3];
    ar=this.h[0];br=this.h[1];cr=this.h[2];dr=this.h[3];
    for(i=0;i<64;i++){
      r=i>>4;
      t=(al+fL(i,bl,cl,dl)+X[ML[i]]+KL4[r])|0;t=(t<<SL[i])|(t>>>(32-SL[i]));
      al=dl;dl=cl;cl=bl;bl=t;
      t=(ar+fR4(i,br,cr,dr)+X[MR[i]]+KR4[r])|0;t=(t<<SR[i])|(t>>>(32-SR[i]));
      ar=dr;dr=cr;cr=br;br=t;
    }
    t=(this.h[1]+cl+dr)|0;
    this.h[1]=(this.h[2]+dl+ar)|0;this.h[2]=(this.h[3]+al+br)|0;
    this.h[3]=(this.h[0]+bl+cr)|0;this.h[0]=t;
  },
  done:function(){
    var g=new RIPEMD128();g.h=this.h.slice();g.len=this.len;
    var buf=ripemdPad(this.buf,this.len),i;
    for(i=0;i<buf.length;i+=64){g.buf=buf.slice(i,i+64);g._cmp();}
    return leOut(g.h,4);
  }
};

// ── RIPEMD-256 ────────────────────────────────────────────────────────────
function RIPEMD256(){this.h=[0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476,0x76543210,0xFEDCBA98,0x89ABCDEF,0x01234567];this.buf=[];this.len=0;}
RIPEMD256.prototype={
  blockSize:64,
  feed:function(data){var i;for(i=0;i<data.length;i++){this.buf.push(data[i]);if(this.buf.length===64){this._cmp();this.buf=[];}}this.len+=data.length;},
  _cmp:function(){
    var X=ld(this.buf),i,r,t,al,bl,cl,dl,ar,br,cr,dr;
    al=this.h[0];bl=this.h[1];cl=this.h[2];dl=this.h[3];
    ar=this.h[4];br=this.h[5];cr=this.h[6];dr=this.h[7];
    for(i=0;i<64;i++){
      r=i>>4;
      t=(al+fL(i,bl,cl,dl)+X[ML[i]]+KL4[r])|0;t=(t<<SL[i])|(t>>>(32-SL[i]));
      al=dl;dl=cl;cl=bl;bl=t;
      t=(ar+fR4(i,br,cr,dr)+X[MR[i]]+KR4[r])|0;t=(t<<SR[i])|(t>>>(32-SR[i]));
      ar=dr;dr=cr;cr=br;br=t;
      if(i===15){t=al;al=ar;ar=t;}
      else if(i===31){t=bl;bl=br;br=t;}
      else if(i===47){t=cl;cl=cr;cr=t;}
      else if(i===63){t=dl;dl=dr;dr=t;}
    }
    this.h[0]=(this.h[0]+al)|0;this.h[1]=(this.h[1]+bl)|0;this.h[2]=(this.h[2]+cl)|0;this.h[3]=(this.h[3]+dl)|0;
    this.h[4]=(this.h[4]+ar)|0;this.h[5]=(this.h[5]+br)|0;this.h[6]=(this.h[6]+cr)|0;this.h[7]=(this.h[7]+dr)|0;
  },
  done:function(){
    var g=new RIPEMD256();g.h=this.h.slice();g.len=this.len;
    var buf=ripemdPad(this.buf,this.len),i;
    for(i=0;i<buf.length;i+=64){g.buf=buf.slice(i,i+64);g._cmp();}
    return leOut(g.h,8);
  }
};

// ── RIPEMD-320 ────────────────────────────────────────────────────────────
function RIPEMD320(){this.h=[0x67452301,0xEFCDAB89,0x98BADCFE,0x10325476,0xC3D2E1F0,0x76543210,0xFEDCBA98,0x89ABCDEF,0x01234567,0x3C2D1E0F];this.buf=[];this.len=0;}
RIPEMD320.prototype={
  blockSize:64,
  feed:function(data){var i;for(i=0;i<data.length;i++){this.buf.push(data[i]);if(this.buf.length===64){this._cmp();this.buf=[];}}this.len+=data.length;},
  _cmp:function(){
    var X=ld(this.buf),i,r,t,al,bl,cl,dl,el,ar,br,cr,dr,er;
    al=this.h[0];bl=this.h[1];cl=this.h[2];dl=this.h[3];el=this.h[4];
    ar=this.h[5];br=this.h[6];cr=this.h[7];dr=this.h[8];er=this.h[9];
    for(i=0;i<80;i++){
      r=i>>4;
      t=(al+fL(i,bl,cl,dl)+X[ML[i]]+KL5[r])|0;t=(((t<<SL[i])|(t>>>(32-SL[i])))+el)|0;
      al=el;el=dl;dl=(cl<<10)|(cl>>>22);cl=bl;bl=t;
      t=(ar+fR5(i,br,cr,dr)+X[MR[i]]+KR5[r])|0;t=(((t<<SR[i])|(t>>>(32-SR[i])))+er)|0;
      ar=er;er=dr;dr=(cr<<10)|(cr>>>22);cr=br;br=t;
      if(i===15){t=bl;bl=br;br=t;}
      else if(i===31){t=dl;dl=dr;dr=t;}
      else if(i===47){t=al;al=ar;ar=t;}
      else if(i===63){t=cl;cl=cr;cr=t;}
      else if(i===79){t=el;el=er;er=t;}
    }
    this.h[0]=(this.h[0]+al)|0;this.h[1]=(this.h[1]+bl)|0;this.h[2]=(this.h[2]+cl)|0;this.h[3]=(this.h[3]+dl)|0;this.h[4]=(this.h[4]+el)|0;
    this.h[5]=(this.h[5]+ar)|0;this.h[6]=(this.h[6]+br)|0;this.h[7]=(this.h[7]+cr)|0;this.h[8]=(this.h[8]+dr)|0;this.h[9]=(this.h[9]+er)|0;
  },
  done:function(){
    var g=new RIPEMD320();g.h=this.h.slice();g.len=this.len;
    var buf=ripemdPad(this.buf,this.len),i;
    for(i=0;i<buf.length;i+=64){g.buf=buf.slice(i,i+64);g._cmp();}
    return leOut(g.h,10);
  }
};

w.sha1=wrap(SHA1);
w.md2=wrap(MD2);
w.ripemd128=wrap(RIPEMD128);
w.ripemd160=wrap(RIPEMD160);
w.ripemd256=wrap(RIPEMD256);
w.ripemd320=wrap(RIPEMD320);
}(window);
