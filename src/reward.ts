import fs from 'fs';
import { Set } from 'typescript';

export interface Reward {
    code: string,
    name: string,
    claimed: boolean
}

export class Rewards {
    static readonly #jsonPath = "rewards.json";
    static #savedRewards: Reward[];
    // set of saved codes for quick access to which codes can be added and which are already saved
    static #savedCodes: Set<string>;

    static read() {
        if (!fs.existsSync(this.#jsonPath)) {
            this.#savedRewards = [];
            return;
        }

        this.#savedRewards = JSON.parse(fs.readFileSync(this.#jsonPath, 'utf-8'));
        this.#savedCodes = new Set(this.#savedRewards.map(reward => reward.code));
    }

    static save(rewards: Reward[]) {
        // filter rewards that we already saved
        rewards = rewards.filter(reward => !this.#savedCodes.has(reward.code));
        // update
        this.#savedRewards.push(...rewards);
        for (const reward of rewards) {
            this.#savedCodes.add(reward.code);
        }
        // save to file
        fs.writeFileSync(this.#jsonPath, JSON.stringify(this.#savedRewards, null, 4));
        console.log(`Just saved ${rewards.length} new rewards.`);
    }
}
