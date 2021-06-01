class Stopwatch {
	constructor(parentName) {
		this.startTime = 0;
		this.finishTime = 0;
		this.laps = [];
		this.getTime = new Date();
		this.time = 0;
		this.lapTime = 0;
		this.parentName = parentName;
		this.running = false;
		
		// selectors
		this.timeDiv = document.querySelector(this.parentName + " > .time");
		this.breakTimeDiv = document.querySelector(this.parentName + " > .breakTime");
		this.lapsList = document.querySelector(this.parentName + " > .lapsDiv > .lapsListDiv > .laps");

		this.startBtn = document.querySelector(this.parentName + " > .startBtn");
		this.finishBtn = document.querySelector(this.parentName + " > .finishBtn");
		this.clearBtn = document.querySelector(this.parentName + " > .lapsDiv > .clearBtn");
		this.stopBtn = document.querySelector(this.parentName + " > .stopBtn");

		// events
		this.startBtn.onclick = () => {
			this.start();
		}
		this.finishBtn.onclick = () => {
			this.finish();
		}
		this.clearBtn.onclick = () => {
			this.clear();
		}
		// this.stopBtn.onclick = () => {
		// 	this.stop();
		// }

        this.loadCookie();

		setInterval(() => {
			this.showTime();
		}, 100);

	}
	start() {
		// this.getTime =
		this.startTime = new Date().getTime();
		this.lapTime = 0;
		this.running = true;

		// this.getTime.setTime(0);
		// this.startTime = this.time;
		// print(this.getTime.getTime());
	}
	finish() {
		// this.time = new Date().getTime();
		this.finishTime = new Date().getTime();;
		this.lapTime = this.finishTime - this.startTime;
        this.laps.unshift(this.lapTime);
        
        this.saveCookie();
		
		// print(this.lapTime.toString().slice(-6,-3) + ":" + this.lapTime.toString().slice(-3));
		// print(this.finishTime);
		// print(this.finishTime - this.startingTime);
	}
	showTime(a) {
		if(this.running){
			this.time = new Date().getTime() - this.startTime;
			// print(this.getTime);


			this.timeDiv.innerHTML = this.formateTime(this.time);
			this.breakTimeDiv.innerHTML = this.formateTime(this.time - this.lapTime);

			this.lapsList.innerHTML = "";
			this.laps.forEach((lap, index) => {
				// print(lap);
				if(index != 0){
					this.lapsList.innerHTML += "<hr>";
				}
				this.lapsList.innerHTML += "<li>" + this.formateTime(lap) + "</li>";
			});
		} else if(a == "LOAD") {
            this.lapsList.innerHTML = "";
			this.laps.forEach((lap, index) => {
				// print(lap);
				if(index != 0){
					this.lapsList.innerHTML += "<hr>";
				}
				this.lapsList.innerHTML += "<li>" + this.formateTime(lap) + "</li>";
			});
        };
	}
	stop() {
		this.running = false;
	}
	clear() {
		this.laps = [];
        this.lapsList.innerHTML = "";
        this.saveCookie();
	}
	formateTime(time) {
		let seconds = time.toString().slice(-6, -3);
		let minutes = Math.floor(seconds / 60);

		seconds -= minutes * 60
		if(parseInt(seconds) < 10) {
			seconds = "0" + seconds;
		} else if(seconds == "") {
			seconds = "00"
		}
		// debugger;
		let miliseconds = time.toString().slice(-3, -2);
		if(parseInt(miliseconds) < 1) {
			miliseconds = 0;
		};
		return minutes + ":" + seconds + "." + miliseconds;
    }
    loadCookie() {
        try {
            var json_str = getCookie(this.parentName);
            this.laps = JSON.parse(json_str);
            this.showTime("LOAD");
            print("Laps loaded from cookie");
        } catch(err) {
            print(err.message);
        }
    }
    saveCookie() {
        try {
            var json_str = JSON.stringify(this.laps);
            createCookie(this.parentName, json_str);
            print("Laps saved to cookie");
        } catch(err) {
            print(err.message);
        }
    }
}