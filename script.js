const paragraphs = [
  // `Ada kalanya sesuatu yang paling berharga bukanlah apa yang terlihat, melainkan apa yang disembunyikan dengan penuh kehati-hatian. Kitab Mandala Prakasa - sebuah peninggalan agung yang menyimpan nilai-nilai luhur, selama ini dipercaya sudah “hilang”. Lokasinya menjadi teka-teki. Keberadaannya menjadi misteri. Namun apakah benar ia hilang? Ataukah ia hanya menunggu untuk ditemukan oleh mereka yang benar-benar layak?`,
  // `Kitab ini bukan sekadar naskah kuno. Ia adalah saksi bisu perjalanan para pemimpin terdahulu. Ia mencatat jejak kejujuran dalam kegelapan, keberanian dalam ketakutan, dan pengabdian dalam keheningan. Kitab ini adalah cermin. Bukan untuk melihat wajah, tetapi untuk melihat ke dalam jiwa. Dan sesungguhnya… kitab itu tidak pernah dicuri. Ia tidak pernah lenyap.`,
  // `Ia kami simpan dengan sengaja. Bukan untuk disembunyikan, tapi untuk dijaga dari tangan yang belum siap. Kami menyimpannya bukan karena takut kehilangannya, tapi karena kami ingin menghidupkannya kembali, bukan lewat mata, tapi lewat pengalaman, pemahaman, dan proses pembentukan diri.`,
  // `Tempat “hilangnya” kitab itu, kini bukan lagi ruang kosong. Ia adalah ruang ujian. Sebuah arena bagi para peserta PTA untuk mencari, bertanya, meragukan, dan akhirnya mengerti. Karena dalam proses pencarian itulah, terbentuk karakter. Dan dalam ketidakhadiran fisik itulah, justru nilai sejati kitab ini bisa hadir lebih utuh. Maka jangan cari Mandala Prakasa hanya dengan langkah kaki, tapi carilah ia dengan langkah hati. Karena sejatinya, kitab itu tidak berada di ujung pencarian, tapi ada di sepanjang perjalanan. `,
  "Tugas kalian kali ini adalah temukan kitab itu di tempat yang tersembunyi, tempat yang hanya bisa ditemukan ketika kalian bisa memahami semua clue yang didapatkan. Perjalanan kalian belum selesai.\nSelamat mencari."
];
    const ANGKA = '2359';
    const TYPE_SPEED = 10;
    const PAUSE_AFTER_PARAGRAPH = 2500;
    const LOOP = false;

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
      if(passInput.value === ANGKA){
        startSequence();
      } else {
        passInput.value = '';
        passInput.placeholder = 'Wrong Answer! -  Try Again!';
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