const solve = document.querySelector("#solve");
const clear = document.querySelector("#clear");
const grid = document.querySelector("#grid");

clear.addEventListener('click', clickedClear);
solve.addEventListener('click', clickedSolve);
//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------
//-------------------------------------------------START ClickedClear-------------------------------------------------

// This function clears all timeouts, animation colors and allow to press Solve and Speed again
function clickedClear(e)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            grid.rows[i].cells[j].firstChild.value = "0";
        }
    }
}



// Clear all colors from animations
function clearAllColors()
{
    for(let i = 0; i < inputs.length; i++)
    {
        inputs[i].classList.remove('active');
        inputs[i].classList.remove('succeeded');
    }
}



//-------------------------------------------------DONE ClickedClear-------------------------------------------------
//-------------------------------------------------DONE ClickedClear-------------------------------------------------
//-------------------------------------------------DONE ClickedClear-------------------------------------------------

//---------------------------------------------START clickedRandomlyFill----------------------------------------------
//---------------------------------------------START clickedRandomlyFill----------------------------------------------
//---------------------------------------------START clickedRandomlyFill----------------------------------------------

// This function is called when we click the "Randomly-fill" button
function makematrix(){
    let matrix = new Array(9);
    for(let i = 0; i < 9; i++)
    {
        matrix[i] = new Array(10);
        for(let j = 0; j < 10; j++)
        {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

function markit(i,j,k,flag,row,col,box){
    row[i][k]=flag;
    col[j][k]=flag;
    var boxno=(Math.floor(i/3))*3+Math.floor(j/3);
    box[boxno][k]=flag;
}
function issafe(i,j,k,row,col,box){
    var boxno=(Math.floor(i/3))*3+Math.floor(j/3);
    if(row[i][k]==1) return 0;
    if(col[j][k]==1) return 0;
    if(box[boxno][k]==1) return 0;
    return 1;
}
function util(i,j,matrix,row,col,box){
    console.log(i,j,matrix);
    if(j==9) {i++;j=0;}
    if(i==9){
        printBoardOnWeb(matrix);
        return 1;
    }
    if(matrix[i][j]!=0){
        var f=util(i,j+1,matrix,row,col,box);
        if(f==1) {return 1;}
    }
    for(var k=1;k<=9;k++){
        if(issafe(i,j,matrix,row,col,box)==1){
            matrix[i][j]=1;
            markit(i,j,matrix[i][j],1,row,col,box);
            var f=util(i,j+1,matrix,row,col,box);
            if(f==1) {return 1;}
            matrix[i][j]=0;
            markit(i,j,matrix[i][j],0,row,col,box);
        }
    }

}
function clickedSolve(e)
{
    let matrix=readValue();
    let row=makematrix();
    let col=makematrix();
    let box=makematrix();
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            if(matrix[i][j]!=0){
                markit(i,j,matrix[i][j],1,row,col,box);
            }
        }
    }
    var f=util(0,0,matrix,row,col,box);
}

// Read value from web board to 2d array
function readValue()
{   
    let matrix = new Array(9);
    for(let i = 0; i < 9; i++)
    {   
        matrix[i] = new Array(9);
        for(let j = 0; j < 9; j++)
        {
            val = grid.rows[i].cells[j].firstChild.value;
            if(val!="") {matrix[i][j]=parseInt(val);}
        }
    }
    for(var i=0;i<9;i++){
        console.log(matrix[i],matrix);
    }
    console.log(matrix);
    return matrix;
}





function alertNoSolution()
{
    alert("No Solution!");
}

function printBoardOnWeb(matrix)
{
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
            if(matrix[i][j] == 0)
                grid.rows[i].cells[j].firstChild.value = "";
            else
                grid.rows[i].cells[j].firstChild.value = matrix[i][j];
        }
    }
}