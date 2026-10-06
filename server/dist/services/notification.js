"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Notification_1 = __importDefault(require("../models/Notification"));
class NotificationService {
    static getNotification(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield Notification_1.default.findById(_id).populate([
                "user",
                "estate",
            ]);
            return notification;
        });
    }
    static getNotifications() {
        return __awaiter(this, void 0, void 0, function* () {
            const notifications = yield Notification_1.default.find({}).populate([
                "user",
                "estate",
            ]);
            return notifications;
        });
    }
    static getNotificationsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const notifications = yield Notification_1.default.find({
                user: userId,
            }).populate(["user", "estate"]);
            return notifications;
        });
    }
    static createNotification(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield Notification_1.default.create(params);
            return notification;
        });
    }
    static deleteNotifications(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = yield Notification_1.default.findByIdAndDelete(_id);
            return notification;
        });
    }
}
exports.default = NotificationService;
//# sourceMappingURL=notification.js.map