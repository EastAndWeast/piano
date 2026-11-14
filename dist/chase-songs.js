'use strict';
// Complete melody forms, arranged in C for a single computer-keyboard voice.
const chaseNoteKeys=['a','s','d','f','g','h','j','k','l',';',"'",']'];
const chaseNoteMidi=[60,62,64,65,67,69,71,72,74,76,77,79];
const twinkleA=[1,1,5,5,6,6,5,4,4,3,3,2,2,1];
const twinkleB=[5,5,4,4,3,3,2,5,5,4,4,3,3,2];
const joyA=[3,3,4,5,5,4,3,2,1,1,2,3,3,2,2];
const joyA2=[3,3,4,5,5,4,3,2,1,1,2,3,2,1,1];
const joyBridge=[2,2,3,1,2,3,4,3,1,2,3,4,3,2,1,2,5];
const brother=[1,2,3,1,1,2,3,1,3,4,5,3,4,5,5,6,5,4,3,1,5,6,5,4,3,1,1,5,1,1,5,1];
const mary=[3,2,1,2,3,3,3,2,2,2,3,5,5,3,2,1,2,3,3,3,3,2,2,3,2,1];
const londonA=[5,6,5,4,3,4,5,2,3,4,3,4,5];
const londonB=[5,6,5,4,3,4,5,2,5,3,1];
const chaseSongs=[
{id:'star',name:'小星星',cover:'★',level:'入门',form:'完整 A–B–A 旋律',degrees:[...twinkleA,...twinkleB,...twinkleA]},
{id:'joy',name:'欢乐颂',cover:'♫',level:'入门',form:'主题、回应与中段',degrees:[...joyA,...joyA2,...joyBridge,...joyA2]},
{id:'brother',name:'两只老虎',cover:'♬',level:'入门',form:'完整四句旋律',degrees:brother},
{id:'mary',name:'玛丽有只小羊羔',cover:'☁',level:'入门',form:'完整问答旋律',degrees:mary},
{id:'london',name:'伦敦桥',cover:'⌂',level:'初级',form:'两段旋律与回归',degrees:[...londonA,...londonB,...londonA,...londonB]},
{id:'parade',name:'音符小镇巡游',cover:'✦',level:'加长串烧',form:'小星星 → 欢乐颂 → 两只老虎',degrees:[...twinkleA,...twinkleB,...twinkleA,...joyA,...joyA2,...joyBridge,...joyA2,...brother]}
].map(s=>({...s,notes:s.degrees.map(d=>chaseNoteMidi[d-1]),keys:s.degrees.map(d=>chaseNoteKeys[d-1])}));
