document.addEventListener('DOMContentLoaded', () => {
    const answer = document.querySelectorAll('.answer');

    answer.forEach((answer) => {
        const button = document.createElement('button');
        button.textContent = 'Click';
        button.style.marginLeft = '10px';
        button.style.display = 'inline';

        button.addEventListener('click', () => {
            const trueA = 'inline';
            const falseA = 'none';

            if (answer.style.display === trueA) {
                answer.style.display = falseA;
            } else {
                answer.style.display = trueA;
            }
        })

        answer.after(button)
    })
})