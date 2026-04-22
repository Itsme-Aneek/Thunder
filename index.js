import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (startDate, endDate) => {
	// Calculate number of days between start and end
	const totalDays = endDate.diff(startDate, "days");

	for (let i = 0; i <= totalDays; i++) {
		const date = moment(startDate).add(i, "days");

		// 70% chance to have commits that day
		const commitToday = random.int(0, 100) < 70;
		if (!commitToday) continue;

		// Random number of commits (1–10)
		const numCommits = random.int(1, 10);

		for (let j = 0; j < numCommits; j++) {
			// Randomize time of day
			const commitTime = date
				.clone()
				.hour(random.int(9, 22))
				.minute(random.int(0, 59))
				.second(random.int(0, 59))
				.format();

			const data = { date: commitTime };
			await jsonfile.writeFile(path, data);

			await git.add(path);
			await git.commit(`Commit on ${commitTime}`, {
				"--date": commitTime,
			});

			console.log(`✅ Commit on ${commitTime}`);
		}
	}

	console.log("🚀 All commits generated!");
	await git.push();
};

// 🗓️ Set your date range (July → November 2025)
const start = moment("2025-11-09", "YYYY-MM-DD");

const end = moment("2026-01-10", "YYYY-MM-DD");

makeCommits(start, end);
