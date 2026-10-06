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
const notification_1 = __importDefault(require("../../services/notification"));
exports.default = {
    Query: {
        notification(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const notification = yield notification_1.default.getNotification(args._id);
                return notification;
            });
        },
        notifications() {
            return __awaiter(this, void 0, void 0, function* () {
                const notifications = yield notification_1.default.getNotifications();
                return notifications;
            });
        },
        notificationsByUser(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const notifications = yield notification_1.default.getNotificationsByUser(args.userId);
                return notifications;
            });
        },
    },
    Mutation: {
        createNotification(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const notification = yield notification_1.default.createNotification(args);
                return notification;
            });
        },
        deleteNotification(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const notification = yield notification_1.default.deleteNotifications(args._id);
                return notification;
            });
        },
    },
};
//# sourceMappingURL=notification.js.map