document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chatWindow");
    const startChatBtn = document.getElementById("startChatBtn");
    const chatControls = document.getElementById("chatControls");
    const buttonRow = document.getElementById("buttonRow");
    const inputRow = document.getElementById("inputRow");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const body = document.body;

    let state = "idle";
    let themeActivated = false;

    function addMessage(text, sender = "bot") {
        const msg = document.createElement("div");
        msg.className = `message ${sender}`;
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = text;
        msg.appendChild(bubble);
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function clearButtons() {
        buttonRow.innerHTML = "";
    }

    function activateNationalTheme() {
        if (themeActivated) return;
        themeActivated = true;
        body.classList.add("national-theme");
    }

    function showInitialSequence() {
        addMessage("مرحباً بسعادتكم في صفحة مركز الحاسب الآلي والشبكات بجامعة ظفار.");
        addMessage("قمنا بإعداد رسالة رقمية خاصة لسعادتكم، وستظهر تفاصيلها من خلال هذه المحادثة التفاعلية.");
        setTimeout(() => {
            askIfPresident();
        }, 800);
    }

    function askIfPresident() {
        addMessage("للتأكد من وصول الرسالة إلى الشخص المناسب، هل أنت سعادة الأستاذ الدكتور رئيس الجامعة؟");
        clearButtons();

        const yesBtn = document.createElement("button");
        yesBtn.className = "chat-btn";
        yesBtn.textContent = "نعم، هذا أنا";
        yesBtn.addEventListener("click", () => {
            addMessage("نعم، هذا أنا", "user");
            clearButtons();
            askForName();
        });

        const noBtn = document.createElement("button");
        noBtn.className = "chat-btn";
        noBtn.textContent = "لا، لست أنا";
        noBtn.addEventListener("click", () => {
            addMessage("لا، لست أنا", "user");
            clearButtons();
            showGenericInvite();
        });

        buttonRow.appendChild(yesBtn);
        buttonRow.appendChild(noBtn);
    }

    function askForName() {
        state = "awaitingName";
        addMessage("نرحّب بسعادتكم، تكرماً اكتب اسمك الأول للتأكيد.");
        inputRow.classList.remove("hidden");
        userInput.focus();
    }

    function showGenericInvite() {
        state = "done";
        activateNationalTheme();
        addMessage("يسعدنا كذلك حضوركم ومشاركتكم في احتفال خاص بالمناسبة الوطنية في مركز الحاسب الآلي والشبكات.");
        addMessage("سيُقام الاحتفال يوم الخميس 20 نوفمبر 2025 الساعة 9:00 صباحاً في مقر المركز بجامعة ظفار، ونتطلع لرؤيتكم ومشاركتكم هذه الفرحة.");
        addMessage("مع خالص التقدير والاحترام، فريق عمل مركز الحاسب الآلي والشبكات.");
    }

    function handleNameSubmit() {
        const name = userInput.value.trim();
        if (!name) return;

        addMessage(name, "user");
        userInput.value = "";

        inputRow.classList.add("hidden");
        state = "done";

        const normalized = name.replace(/\s+/g, "").toLowerCase();

        activateNationalTheme();

        if (normalized.includes("عامر") || normalized.includes("amer")) {
            addMessage("أهلاً وسهلاً بسعادتكم البروفيسور عامر الرواس، رئيس جامعة ظفار.");
            addMessage("يسعدنا في مركز الحاسب الآلي والشبكات أن ندعوكم لحضور احتفال خاص بالمناسبة الوطنية في حرم الجامعة.");
            addMessage("سيُقام الاحتفال يوم الخميس 20 نوفمبر 2025 في تمام الساعة 9:00 صباحاً بمقر المركز، ووجودكم بيننا مصدر فخر واعتزاز لنا.");
        } else {
            addMessage("شرفٌ كبير لنا حضوركم الكريم.");
            addMessage("نتشرف بدعوتكم لحضور احتفال مركز الحاسب الآلي والشبكات بالمناسبة الوطنية، وذلك يوم الخميس 20 نوفمبر 2025 الساعة 9:00 صباحاً في مقر المركز بجامعة ظفار.");
        }

        addMessage("مع خالص التقدير والاحترام، فريق عمل مركز الحاسب الآلي والشبكات.");
    }

    startChatBtn.addEventListener("click", () => {
        chatWindow.innerHTML = "";
        chatControls.classList.remove("hidden");
        inputRow.classList.add("hidden");
        clearButtons();
        body.classList.remove("national-theme");
        themeActivated = false;
        state = "chatting";
        showInitialSequence();
    });

    sendBtn.addEventListener("click", () => {
        if (state === "awaitingName") {
            handleNameSubmit();
        }
    });

    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && state === "awaitingName") {
            e.preventDefault();
            handleNameSubmit();
        }
    });
});
