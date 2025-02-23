"use strict";

import Cookies from "./cookies.js";

import { TwitchPage } from "./page.js";

export class LoginPage extends TwitchPage {

    async login(username: string, password: string, timeout?: number) {
        if (timeout) {
            this.page.setDefaultTimeout(1000 * timeout);
        }

        // clear cookies
        await Cookies.clear(this.page);

        await this.page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

        // Go to login page
        await this.page.goto("https://www.twitch.tv/login");

        // Enter username
        await this.page.focus("#login-username");
        await this.page.keyboard.type(username);

        // Enter password
        await this.page.focus("#password-input");
        await this.page.keyboard.type(password);

        // Click login button
        await this.page.click('[data-a-target="passport-login-button"]');

        // prepare closing
        await Cookies.waitForCookies(this.page, 0);
        const cookies = new Cookies(await this.page.cookies());

        await this.page.close();

        return cookies;
    }
}