// Funds that have already been donated that Tithe.ly didn't record/include in the API
const ALREADY_DONATED = 615;
const EXISTING_DONORS = 1;

const animateBar = () => {
    const bar = document.querySelector(".bar-fill-animation");
    bar.style.animation = "fillBar 5s";
    bar.style.animationFillMode = "forwards";
}

document.addEventListener("DOMContentLoaded", () => {
    const pledgedAmount = document.querySelector(".money-pledged h3");
    const goal = document.querySelector(".money-pledged p");
    const pledgedDonors = document.querySelector(".donors-pledged h3");
    const barFill = document.querySelector(".bar-fill");

    fetch("https://giving.tithely.com/v1/campaigns/dayspring-bible-camp/staff-cabins-2023", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.7",
            "api-version": "2022-01-25",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "sec-gpc": "1"
        },
        "referrer": "https://campaigns.tithely.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
    })
        .then(res => res.json())
        .then(data => {
            let { goal_amount, total_pledged, num_donors, percent_pledged } = data.data;

            total_pledged += ALREADY_DONATED * 100;
            num_donors += EXISTING_DONORS;

            // Match up to $5,000
            if (total_pledged > 500000) total_pledged += 500000;
            else total_pledged *= 2;

            percent_pledged = (total_pledged / goal_amount) * 100;

            if (!isNaN(total_pledged)) pledgedAmount.innerText = `$${(total_pledged / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            if (!isNaN(goal_amount)) goal.innerText = `Pledged of $${(goal_amount / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} goal`;
            if (!isNaN(num_donors)) pledgedDonors.innerText = num_donors.toLocaleString();
            if (!isNaN(percent_pledged)) {
                barFill.style.width = `${percent_pledged}%`;
                animateBar();
            }
        });
});