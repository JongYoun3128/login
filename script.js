// DOM 요소 가져오기
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const signupModal = document.getElementById("signupModal");
const openSignupBtn = document.getElementById("openSignupBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelSignupBtn = document.getElementById("cancelSignupBtn");

// 👉👉👉👉👉 탐훈 작업 시작부분
const url =
    "https://script.google.com/macros/s/AKfycbyw0UeUpx-y9eJ1T3zLqkl8LOzBVkU1OTgG0gAzuGGe5chJrArzE6n4f6ZR4FUMfGs/exec";

const 등록하기 = async () => {
    const sigupId = document.querySelector("#signup-username").value;
    const sigupPas = document.querySelector("#signup-password").value;
    const sigupPasfirm = document.querySelector("#confirm-password").value;
    const sigupName = document.querySelector("#name").value;
    const sigupTel = document.querySelector("#phone").value;
    const sigupEmail = document.querySelector("#email").value;
    const sigupAddress = document.querySelector("#address").value;
    const sigupSsn = document.querySelector("#ssn").value;

    const 회원가입정보 = {
        memberId: sigupId,
        password: sigupPas,
        name: sigupName,
        tel: sigupTel,
        address: sigupAddress,
        email: sigupEmail,
        registNumber: sigupSsn,
    };
    if (sigupPas !== sigupPasfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }
    const res = await fetch(url, {
        redirect: "follow",
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(회원가입정보),
    });
};

// ✅ 등록테스트

const 로그인 = async () => {
    const 유저입력아이디 = document.querySelector("#username").value;
    const 유저입력비번 = document.querySelector("#password").value;

    if (!유저입력아이디 || !유저입력비번) {
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }

    const res = await fetch(
        `${url}?memberId=${유저입력아이디}&password=${유저입력비번}`
    );
    const data = await res.json();

    if (data) {
        // 로그인 성공처리
        // 로컬스토리지에 아이디 넣고
        // 페이지이동
        localStorage.setItem("memberInfo", JSON.stringify(data));
        location.href = "infopage.html";
    } else {
        // 로그인 실패처리
        // 모달창 띄우기
        alert("아이디와 비밀번호 확인해주세요");
    }
};
// const 로그인 = () => {
//     const 유저입력아이디 = "tomhoon";
//     const 유저입력비번 = "1234";

//     fetch(url + `?memberId=${유저입력아이디}&password=${유저입력비번}`);
// }
// ✅ 로그인테스트
// 로그인();

// 👉👉👉👉👉 탐훈 작업 끝부분

// 로그인 폼 제출 이벤트
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("로그인 시도:", { username, password });
    alert(`로그인 시도\n아이디: ${username}`);
});

// 회원가입 버튼 클릭 - 모달 열기
openSignupBtn.addEventListener("click", function () {
    signupModal.style.display = "flex";
    document.body.style.overflow = "hidden"; // 배경 스크롤 방지
});

// 모달 닫기 함수
function closeModal() {
    signupModal.style.display = "none";
    document.body.style.overflow = "auto"; // 배경 스크롤 복원
    signupForm.reset(); // 폼 초기화
}

// X 버튼으로 모달 닫기
closeModalBtn.addEventListener("click", closeModal);

// 취소 버튼으로 모달 닫기
cancelSignupBtn.addEventListener("click", closeModal);

// 모달 배경 클릭시 닫기
signupModal.addEventListener("click", function (e) {
    if (e.target === signupModal) {
        closeModal();
    }
});

// 회원가입 폼 제출 이벤트
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 폼 데이터 가져오기
    const formData = {
        username: document.getElementById("signup-username").value,
        password: document.getElementById("signup-password").value,
        confirmPassword: document.getElementById("confirm-password").value,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        ssn: document.getElementById("ssn").value,
    };

    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    // 회원가입 로직 구현
    console.log("회원가입 데이터:", formData);
    alert("회원가입이 완료되었습니다!");

    closeModal();
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && signupModal.style.display === "flex") {
        closeModal();
    }
});
