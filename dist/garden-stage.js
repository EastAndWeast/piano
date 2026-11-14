'use strict';
// Visual theme changes only: preserve the shared instrument and playback state.
palettes.aurora=['74,137,90','197,123,71'];palettes.ember=['176,101,60','153,116,58'];palettes.moon=['82,118,146','174,130,72'];
const gardenStageFocus=setFocus;setFocus=function(v){gardenStageFocus(v);$('.studio-sidebar').inert=v;window.dispatchEvent(new Event('resize'))};
$$('[data-theme]').forEach(b=>b.addEventListener('click',()=>{$('#scene-name').textContent={aurora:'01 / 薄荷花园',ember:'02 / 蜜桃午后',moon:'03 / 奶油晴天'}[b.dataset.theme]}));
$('#scene-name').textContent={aurora:'01 / 薄荷花园',ember:'02 / 蜜桃午后',moon:'03 / 奶油晴天'}[document.body.dataset.scene];
const songBaseDraw=drawSong;drawSong=function(){songBaseDraw();$('#song-start').textContent=songState==='running'?'Ⅱ 暂停':songState==='paused'?'▷ 继续':songMode==='learn'?'开始练习':'开始播放'};drawSong();
$$('[data-theme]').forEach(b=>b.innerHTML='<i></i>'+{aurora:'薄荷',ember:'蜜桃',moon:'奶油'}[b.dataset.theme]);
$('.stage-caption').innerHTML='<span class="line"></span> ✦ 这里，就是你的主场 <span class="line"></span>';
