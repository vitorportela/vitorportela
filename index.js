//🧠 🏠 🖥️
function buttoncolor(){
    const cor1 = "pink";
    const cor2 = "#abc";
    document.getElementById("bthome").style.color = cor1;
    document.getElementById("bthskill").style.color = cor2;
    document.getElementById("btsskill").style.color = cor2;
    document.getElementById("btport").style.color = cor2;
}
window.addEventListener("scroll", () => {
    const x = document.getElementById("home").offsetHeight ;
    const imgport = document.getElementById("imgVitorPort");   
    const cor1 = "pink";
    const cor2 = "#abc";
    if(window.scrollY<(x/2)){
        document.getElementById("bthome").style.color = cor1;
        document.getElementById("bthskill").style.color = cor2;
        document.getElementById("btsskill").style.color = cor2;
        document.getElementById("btport").style.color = cor2;
        console.log("home");
    }

    if(window.scrollY>=(x/2)&&window.scrollY<((x/2)*3)){
        document.getElementById("bthome").style.color = cor2;
        document.getElementById("bthskill").style.color = cor1;
        document.getElementById("btsskill").style.color = cor2;
        document.getElementById("btport").style.color = cor2;
        console.log("skill");
    }
    if(window.scrollY>=((x/2)*4)&&window.scrollY<((x/2)*5)){
        document.getElementById("bthome").style.color = cor2;
        document.getElementById("bthskill").style.color = cor2;
        document.getElementById("btsskill").style.color = cor1;
        document.getElementById("btport").style.color = cor2;
        console.log("skill");
    }
    if(window.scrollY>=((x/2)*5)&&window.scrollY<((x/2)*6)){
        document.getElementById("bthome").style.color = cor2;
        document.getElementById("bthskill").style.color = cor2;
        document.getElementById("btsskill").style.color = cor2;
        document.getElementById("btport").style.color = cor1;

        imgport.classList.add("bigimgblock");
        imgport.classList.remove("smallimgblock");

        document.getElementById("portfolio_titulo").style.fontSize = "8vw"; 
        document.getElementById("portfolio_titulo").style.alignSelf = "center"; 
        document.getElementById("portfolio_titulo").style.marginTop = "0";

        document.getElementById("titleportifolio").style.height = "100vh";
        document.getElementById("titleportifolio").style.position = "relative";

        console.log("port");
    }

    if(window.scrollY>((x/2)*5.9)){

        imgport.classList.add("smallimgblock");
        imgport.classList.remove("bigimgblock");

        document.getElementById("portfolio_titulo").style.fontSize = "4vw"; 
        document.getElementById("portfolio_titulo").style.alignSelf = "start"; 
        document.getElementById("portfolio_titulo").style.marginTop = "10vh";

        document.getElementById("titleportifolio").style.height = "25vh";
        document.getElementById("titleportifolio").style.position = "fixed";

        console.log("port mid");
    }

});

pixelImage("canvas1",15);

function pixelImage(canvava,tamanho) {
    //canvava é o ID do canvas
    //tamanho quanto menor maior a imagem
    const x = document.getElementById("home").offsetHeight ;
    let contcanvas = 0;
    let altura, largura;
    const canvas = document.getElementById(canvava);    
    const ctx = canvas.getContext("2d");
    resized();
    let particleArray = [];
    // mouse
    let mouse ={
        x:null,
        y:null,
        radius:118
    }

    window.addEventListener("mousemove", event =>{
            mouse.x = (event.x*largura*2)-window.innerWidth/9; //mudar aqui<-----------------------------------------------------
            mouse.y = (event.y*altura)-innerHeight/5 ;
        }
    );

    function drawImage(){
        let imageWidth = png.width;
        let imageHeight = png.height;
        const data = ctx.getImageData(0,0,imageWidth,imageHeight);
        ctx.clearRect(0,0,canvas.width,canvas.height);

        class Particle{
            constructor(x,y,color){
                   this.x = Math.random()*canvas.width;
                   this.y = Math.random()*canvas.height;
                this.color = color,
                this.size = 2.5,
                this.baseX = x + canvas.width/2 - png.width*2,
                this.baseY = y + canvas.height/2 - png.height*2,
                this.density = (Math.random() * 8) + 0.666;
            }

            draw(){
                ctx.beginPath();
                //ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
                ctx.fillRect( this.x , this.y , this.size*2 , this.size*2);
                ctx.closePath();
                ctx.fill();
            }

            update(){
                ctx.fillStyle = this.color;
                //colision
                let dx = mouse.x - this.x
                let dy = mouse.y - this.y
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                //distancia maxima
                const maxDistance = 120;
                let force = ((maxDistance - distance) / maxDistance);
                if(force < 0) force = 0;

                let directionX = (forceDirectionX * force * this.density * 1.1);
                let directionY = (forceDirectionY * force * this.density * 1.1);
                
                if(distance < mouse.radius + this.size){
                    this.x -= directionX;
                    this.y -= directionY;                
                }else{
                    if(this.x !== this.baseX){
                        let dx = this.x - this.baseX;
                        this.x -= dx/12;
                    } if(this.y !== this.baseY){
                        let dy = this.y - this.baseY;
                        this.y -= dy/12;
                    }
                }
                this.draw();
            }
        }

        function init() {
            particleArray = [];            
            for(let y = 0, y2 = data.height; y < y2; y++ ){
                for(let x = 0, x2 = data.width; x < x2; x++){
                    if(data.data[(y * 4 * data.width) + ( x * 4 ) + 3 ] > 128 ){
                        let positionX = x;
                        let positionY = y;
                        let color = "rgb("+ data.data[( y * 4 * data.width) + ( x * 4 )]+ "," +
                                            data.data[( y * 4 * data.width) + ( x * 4 ) + 1 ]+","+
                                            data.data[( y * 4 * data.width) + ( x * 4 ) + 2 ]+")";
                        particleArray.push(new Particle(positionX * 4, positionY * 4, color));
                    }
                }
            }
        }


        function animate() {
            requestAnimationFrame(animate);
            //fundo
            ctx.fillStyle = "rgba(54,54,54,0.5)";
            //ctx.fillRect(0,0,window.innerWidth*largura,window.innerHeight*altura);
            ctx.fillRect(0,0,800,800);
            for(let i = 0; i < particleArray.length;i++){
                particleArray[i].update();
            }        
        }

        init();
        animate();
        //-----=====reloads====----
        canvas.addEventListener("click",() => {
                init();    
            }
        );    

        window.addEventListener("resize",() => {
                resized();
                init();            
            }
        );   

        window.addEventListener("scroll",() => {
            if(window.scrollY>((x/2)*1.6)){
                if(contcanvas === 0){
                    init();   
                    contcanvas = 1;
                }
            }
            if(window.scrollY<(x/2)){
                contcanvas = 0;
            }
        });

    }

    function resized(){
        altura = tamanho/10
        largura = altura/2
        //canvas.width = window.innerWidth*largura;
        //canvas.height = window.innerHeight*altura;
        canvas.width = 800;
        canvas.height = 800;
    }

    const png = new Image();
    png.src = "data:image/png;base64,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LmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOjU0YjhjMWU0LTg1MzctNGQ4Yy1hMmU3LTU5MTMwYjk3MTRhZiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmZTlhYWQ5Yi1mMjliLTQ5ZGItOTUzOS01ZjJjZjRjZDQ1ZWYiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozZjU5ZDUzNy02ZmEzLTQ0YzYtYTFiYS00MGJkNmMwYWJhNWEiCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjE3MzkxMjQ5MjA4OTQyIgogICBHSU1QOlZlcnNpb249IjIuMTAuMjIiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCI+CiAgIDxpcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uQ3JlYXRlZD4KICAgPGlwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkxvY2F0aW9uU2hvd24+CiAgIDxpcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OkFydHdvcmtPck9iamVjdD4KICAgPGlwdGNFeHQ6UmVnaXN0cnlJZD4KICAgIDxyZGY6QmFnLz4KICAgPC9pcHRjRXh0OlJlZ2lzdHJ5SWQ+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU5NTJlYzdmLTcwZmMtNDNjMi1iOGNkLWVmMGQ4ZTJlNzkzOCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChXaW5kb3dzKSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyMS0wNC0wMlQxNjoyMDo0OSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDxwbHVzOkltYWdlU3VwcGxpZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZVN1cHBsaWVyPgogICA8cGx1czpJbWFnZUNyZWF0b3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpJbWFnZUNyZWF0b3I+CiAgIDxwbHVzOkNvcHlyaWdodE93bmVyPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6Q29weXJpZ2h0T3duZXI+CiAgIDxwbHVzOkxpY2Vuc29yPgogICAgPHJkZjpTZXEvPgogICA8L3BsdXM6TGljZW5zb3I+CiAgPC9yZGY6RGVzY3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz44ia+dAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAB3RJTUUH5QQCExQxtMSEnAAAIABJREFUeNrtvXuMZPd1JvbdV92quvV+95vdM2pxyKHIMU0pAk1ZgOkoAjYQmayxq78SeLVYJEBgGAsZGwTeJA7iXdgJ1oYDbIQQ8SJrxzEUyLIlwA8JpkiCliWR4mOGM8Oe7pnpnn5Uddf7catuVd26+YPz/Xz6cmRbWcuama4fMCCnp7uqun5fncd3vnMOMD/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zMz/zc0aP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"

    window.addEventListener('load',(event)=>{
        console.log('page has loaded');
        ctx.drawImage(png,0,0);
        drawImage();
    });

}