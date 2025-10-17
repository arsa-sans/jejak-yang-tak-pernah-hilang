const PASSWORD = '2359';
    const paragraphs = [
      `Kitab Mandala Prakasa - sebuah peninggalan agung yang menyimpan
nilai-nilai luhur, telah lama disebut-sebut sebagai "hilang". Lokasinya menjadi
teka-teki. Keberadaannya menjadi misteri. Namun apakah benar ia hilang?
Ataukah ia hanya menunggu untuk ditemukan oleh mereka yang benar-benar layak?`,
    ];
    const TYPE_SPEED = 50;
    const PAUSE_AFTER_PARAGRAPH = 2500;
    const LOOP = true;

    const overlay = document.getElementById('overlay');
    const passInput = document.getElementById('passwordInput');
    const btnSubmit = document.getElementById('btnSubmit');
    const textEl = document.getElementById('line');
    const cursor = document.getElementById('cursor');
    const btnPause = document.getElementById('btnPause');
    const btnRestart = document.getElementById('btnRestart');
    const backsound = document.getElementById('backsound');
    // const voiceover = document.getElementById('voiceover');

    let typing = false;
    let paused = false;
    let currentParagraph = 0;
    let charIndex = 0;
    let timeoutId = null;

    function hideOverlay() { overlay.style.display = 'none'; }
    function startSequence() {
      hideOverlay();
      backsound.play().catch(()=>{});
      // voiceover.play().catch(()=>{});
      startTyping();
    }

    btnSubmit.addEventListener('click', checkPassword);
    passInput.addEventListener('keydown', (e)=>{ if(e.key==='Enter') checkPassword(); });

    function checkPassword(){
      if(passInput.value === PASSWORD){
        startSequence();
      } else {
        passInput.value = '';
        passInput.placeholder = 'kata sandi salah — coba lagi';
      }
    }

    function startTyping(){
      if(typing) return;
      typing = true; paused = false; btnPause.textContent = 'Jeda';
      typeParagraph();
    }
    function typeParagraph(){
      if(paused) return;
      const p = paragraphs[currentParagraph] || '';
      if(charIndex <= p.length){
        textEl.textContent = p.slice(0, charIndex);
        charIndex++;
        timeoutId = setTimeout(typeParagraph, TYPE_SPEED + Math.random()*20);
      } else {
        charIndex = 0;
        currentParagraph++;
        if(currentParagraph >= paragraphs.length){
          if(LOOP) currentParagraph = 0; else { typing=false; return; }
        }
        timeoutId = setTimeout(()=>{ textEl.textContent=''; typeParagraph(); }, PAUSE_AFTER_PARAGRAPH);
      }
    }

    btnPause.addEventListener('click', ()=>{
      if(!typing) return;
      if(paused){ paused = false; btnPause.textContent='Jeda'; typeParagraph(); }
      else { paused = true; btnPause.textContent='Lanjut'; clearTimeout(timeoutId); }
    });
    btnRestart.addEventListener('click', ()=>{
      clearTimeout(timeoutId);
      typing = false; paused = false; currentParagraph = 0; charIndex = 0; textEl.textContent='';
      startTyping();
    });