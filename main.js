class Calendar {
    constructor() {
        // por Date.now() potem z tego new Date, i ta pierwsza wartosc pozostaje niezmienna!!
        this.dataSet = Date.now();
        this.actualDate = new Date(this.dataSet);
        this.actualMonth = this.actualDate.getMonth();
        this.actualDay = this.actualDate.getDate();
        this.days = $(".day");
        this.controls = $(".controls");
        this.display = $(".display_month");


        this.days.on("click", (event) => {
            let day = event.target 
            this.days.removeClass("clicked_day");

            if (day.className == "day prev_month") {
                
            this.changeMonth("prev")

            } else if (day.className == "day next_month") {

                this.changeMonth("next")

            } else {

            day.className += " clicked_day"

            }
        })

        this.controls.on("click", "button", (e) => {
            let target = e.target.dataset.op;

            target == "prev" ? this.changeMonth("prev") : this.changeMonth("next");

        })

        this.makeCalendar(this.dataSet);
    }

    makeCalendar(dataSet) {  
        
        let date = dataSet;
        let actualDate = new Date(date);
        
        actualDate.setDate(1);
        let firstDay = actualDate.getDay(),
        firstDayName = this.weekDays[firstDay],
        index;
        

    this.days.each((day) => {
        if (this.days[day].parentElement.dataset.week == "1") {
                if (this.days[day].dataset.dayname == firstDayName) {
            this.days[day].textContent = "1";
            this.days[day].className = "day current_month";
            index = day;
        } };
        
    });
        this.fillMonths(index, dataSet);
        this.actualDayShow();
        this.showMonth();
    };

      
   fillMonths(index, dataSet) {

 this.fillPrevMonth(index, dataSet);


        index++;
        let z = 2,
        dateToCheck = new Date(dataSet),
        m = dateToCheck.getMonth(),
        n = this.actualDay;

        while (m == this.actualMonth) {

            dateToCheck.setDate(n) 
            m = dateToCheck.getMonth();
            n++
        }

        while (z < n-1) {

            this.days[index].textContent = z;
            this.days[index].className = "";
            this.days[index].className = "day current_month";

            index++
            z++
        }
       
        this.fillNextMonth(index);
    };

    fillPrevMonth(index, dataSet) {
        index--;

        let dateToCheck = new Date(dataSet);
        dateToCheck.setDate(0);
        let z = dateToCheck.getDate();

        while (index >= 0) {

            this.days[index].textContent = z;
            this.days[index].className = "";
            this.days[index].className = "day prev_month";

            z--;
            index--;
        }
    };

    fillNextMonth(index) {

        let z = 1;

        while (index < this.days.length) {

            this.days[index].textContent = z;
            this.days[index].className = "";
            this.days[index].className = "day next_month";

            z++;
            index++;

        }

    }

    actualDayShow() {
        
       this.days.removeClass("current_day")
        this.days.each((i) => {
           if (this.actualDate.getTime() == this.dataSet ) {
            if (this.days[i].textContent == this.actualDay && this.days[i].className == "day current_month") {
                this.days[i].className += " current_day";
            }}

        });
    };

    showMonth() {
    
        this.display.text(`${this.months[this.actualMonth]} ${this.actualDate.getFullYear()}`);

    };

    changeMonth(val) {

        if (val == "prev"){

            this.actualDate.setMonth(this.actualMonth-1);
            let dataSet = this.actualDate.getTime();
            this.actualMonth = this.actualDate.getMonth();
            this.makeCalendar(dataSet);


        } else if (val == "next") {

            this.actualDate.setMonth(this.actualMonth+1);
            let dataSet = this.actualDate.getTime();
            this.actualMonth = this.actualDate.getMonth();
            this.makeCalendar(dataSet);

        }
    }

    weekDays = {
        1: "pon",
        2: "wto",
        3: "sro",
        4: "czw",
        5: "pt",
        6: "sob",
        0: "nd"
    };

    months = {
    0: "Styczeń",
    1: "Luty",
    2: "Marzec",
    3: "Kwiecień",
    4: "Maj",
    5: "Czerwiec",
    6: "Lipiec",
    7: "Sierpień",
    8: "Wrzesień",
    9: "Październik",
    10: "Listopad",
    11: "Grudzień"
    }
}

const kalendarz = new Calendar();