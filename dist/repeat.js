// Repetition is shared by guided practice and the synthesized demonstration.
let repeatKind=null,repeatTarget=1,repeatRound=0,repeatTimer=null,repeatGap=false;
const repeatBar=document.createElement('div');repeatBar.className='repeat-controls';repeatBar.innerHTML=`<label for="repeat-count">循环次数</label><div class="repeat-stepper"><button id="repeat-minus" aria-label="减少循环次数">−</button><input id="repeat-count" type="number" min="1" max="20" step="1" value="1" aria-label="循环次数"><button id="repeat-plus" aria-label="增加循环次数">＋</button></div><span class="repeat-hint">每轮间隔 2 秒</span><span id="repeat-status" role="status" aria-live="polite">默认练 1 轮</span><button id="repeat-stop" disabled>■ 停止</button>`;
$('.room-tabs').after(repeatBar);
function repeatCount(){const n=Number($('#repeat-count').value);const count=Number.isFinite(n)?Math.max(1,Math.min(20,Math.round(n)||1)):1;$('#repeat-count').value=count;return count}
function repeatUI(text){$('#repeat-status').textContent=text;$('#repeat-stop').disabled=!repeatKind;for(const s of ['#repeat-count','#repeat-minus','#repeat-plus'])$(s).disabled=!!repeatKind;$('#room-play').disabled=repeatGap;}
function clearRepeat(){clearTimeout(repeatTimer);repeatTimer=null;repeatKind=null;repeatGap=false;repeatRound=0;repeatUI(`已设定 ${repeatCount()} 轮`)}
function planRepeat(kind){repeatTarget=repeatCount();repeatKind=kind;repeatRound=1;repeatUI(`第 1 / ${repeatTarget} 轮 · ${kind==='play'?'跟弹':'示范'}`)}
function nextRepeat(callback){repeatGap=true;repeatUI(`第 ${repeatRound} / ${repeatTarget} 轮完成 · 2 秒后继续`);repeatTimer=setTimeout(()=>{repeatGap=false;repeatRound++;repeatUI(`第 ${repeatRound} / ${repeatTarget} 轮 · ${repeatKind==='play'?'跟弹':'示范'}`);callback()},2000)}
$('#repeat-count').onchange=()=>repeatUI(`已设定 ${repeatCount()} 轮`);
$('#repeat-minus').onclick=()=>{$('#repeat-count').value=repeatCount()-1;$('#repeat-count').onchange()};
$('#repeat-plus').onclick=()=>{$('#repeat-count').value=repeatCount()+1;$('#repeat-count').onchange()};
const singleBeginRoom=beginRoom;
beginRoom=function(){if(repeatGap)return;if(repeatKind==='demo')stopRepeating();if(!repeatKind){planRepeat('play');$('#room-result').hidden=true;}singleBeginRoom();repeatUI(`第 ${repeatRound} / ${repeatTarget} 轮 · ${roomPlaying?'跟弹':'已暂停'}`)};
$('#room-play').onclick=()=>beginRoom();
const singleCompleteRoom=completeRoom;
completeRoom=function(){singleCompleteRoom();if(repeatKind!=='play')return;if(repeatRound<repeatTarget){$('#room-result').hidden=true;nextRepeat(()=>{runLesson(roomItem,roomKey);stopMetro();roomPlaying=false;singleBeginRoom();});}else{const rounds=repeatTarget;clearRepeat();repeatUI(`已完成全部 ${rounds} 轮`);$('#result-detail').textContent=`已完成 ${rounds} 轮训练 · 本轮准确率 ${Math.round(correct/attempts*100)}%。休息一下，或继续下一节课。`;}};
const singleDemo=$('#demo').onclick;
function playDemoRound(){stopDemo();stopMetro();allOff();roomPlaying=false;cancelAnimationFrame(fallFrame);$('#room-result').hidden=true;training={...roomItem,key:roomKey,rhythm:false};index=attempts=correct=0;draw();singleDemo();$('#room-demo').textContent='■ 停止示范';$('#room-play').textContent='▷ 开始跟弹';repeatUI(`第 ${repeatRound} / ${repeatTarget} 轮 · 示范`);repeatTimer=setTimeout(()=>{if(repeatKind!=='demo')return;if(repeatRound<repeatTarget){nextRepeat(playDemoRound);}else{const rounds=repeatTarget;clearRepeat();$('#room-demo').textContent='▷ 再听一遍';$('#listening-status').textContent='现在，把这段旋律交给你。';repeatUI(`已听完 ${rounds} 轮示范`);restorePractice();}},roomItem.notes.length*60000/bpm()+60)}
function restorePractice(){if(!$('#chapter-play').hidden){runLesson(roomItem,roomKey);stopMetro();roomPlaying=false;$('#feedback').textContent='准备好后点击“开始跟弹”';}}
function startDemoRepeats(){if(repeatKind==='demo'){stopRepeating();return}if(repeatKind)stopRepeating();planRepeat('demo');playDemoRound()}
$('#room-demo').onclick=startDemoRepeats;$('#demo').onclick=startDemoRepeats;
function stopRepeating(){const wasDemo=repeatKind==='demo';clearRepeat();stopDemo();stopMetro();allOff();roomPlaying=false;cancelAnimationFrame(fallFrame);$('#room-result').hidden=true;$('#room-demo').textContent='▷ 播放教学示范';$('#room-play').textContent='▷ 开始跟弹';$('#listening-status').textContent='已停止，随时可以重新开始。';if(wasDemo)restorePractice();else if(!$('#chapter-play').hidden){runLesson(roomItem,roomKey);stopMetro();$('#feedback').textContent='已停止，点击“开始跟弹”从第一轮开始';}repeatUI('已停止循环');}
$('#repeat-stop').onclick=stopRepeating;
// All exits cancel the pending inter-round timer, including during the gap.
const singleChapter=chapter;chapter=function(name){clearRepeat();singleChapter(name)};
const singleLeaveRoom=leaveRoom;leaveRoom=function(){clearRepeat();singleLeaveRoom()};
const singleStart=start;start=function(item,key){clearRepeat();singleStart(item,key)};
$('#leave-room').onclick=()=>leaveRoom();$('#exit-training').onclick=()=>leaveRoom();
const singleReset=$('#room-reset').onclick;$('#room-reset').onclick=()=>{clearRepeat();singleReset()};
const singleSpeed=$('#room-speed').onchange;$('#room-speed').onchange=()=>{if(repeatKind==='demo'){stopRepeating();}singleSpeed()};
// A hidden browser tab must never start a new round in the background.
document.addEventListener('visibilitychange',()=>{if(document.hidden&&repeatKind)stopRepeating()});
document.addEventListener('click',event=>{if(event.target.closest('#load-video')&&repeatKind)stopRepeating()},true);
