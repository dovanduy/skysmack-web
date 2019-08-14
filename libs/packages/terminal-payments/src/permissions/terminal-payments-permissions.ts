import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class TerminalPaymentsPermissions {
    // CONNECTION ACTION
    public static changeConnectionAction = 'ChangeConnectionAction';
    public static cardTransactionAction = 'CardTransactionAction';
    public static adminAction = 'AdminAction';
    public static abortAction = 'AbortAction';

    // CONNECTION NOTIFICATIONS
    public static terminalClient = 'TerminalClient'
    public static findConnectionStrings = 'FindConnectionStrings'
    public static changeConnectionNotification = 'ChangeConnectionNotification'
    public static cardTransactionNotification = 'CardTransactionNotification'
    public static adminNotification = 'AdminNotification'

    // CONNECTIONS
    private static connections = 'Connections';

    public static findConnections = FIND + TerminalPaymentsPermissions.connections;
    public static addConnections = ADD + TerminalPaymentsPermissions.connections;
    public static updateConnections = UPDATE + TerminalPaymentsPermissions.connections;
    public static removeConnections = REMOVE + TerminalPaymentsPermissions.connections;

    // LOGS
    private static logs = 'Logs';

    public static findLogs = FIND + TerminalPaymentsPermissions.logs;
    public static addLogs = ADD + TerminalPaymentsPermissions.logs;
    public static updateLogs = UPDATE + TerminalPaymentsPermissions.logs;
    public static removeLogs = REMOVE + TerminalPaymentsPermissions.logs;

    // TERMINALS
    private static terminals = 'Terminals';

    public static findTerminals = FIND + TerminalPaymentsPermissions.terminals;
    public static addTerminals = ADD + TerminalPaymentsPermissions.terminals;
    public static updateTerminals = UPDATE + TerminalPaymentsPermissions.terminals;
    public static removeTerminals = REMOVE + TerminalPaymentsPermissions.terminals;

    // TERMINAL PAYMENT RECEIPTS
    private static terminalPaymentReceipts = 'TerminalPaymentReceipts';
    private static terminalPaymentReceiptsFields = 'TerminalPaymentReceipts' + FIELDS;

    public static findTerminalPaymentReceipts = FIND + TerminalPaymentsPermissions.terminalPaymentReceipts;
    public static addTerminalPaymentReceipts = ADD + TerminalPaymentsPermissions.terminalPaymentReceipts;
    public static updateTerminalPaymentReceipts = UPDATE + TerminalPaymentsPermissions.terminalPaymentReceipts;
    public static removeTerminalPaymentReceipts = REMOVE + TerminalPaymentsPermissions.terminalPaymentReceipts;

    public static findTerminalPaymentReceiptsFields = FIND + TerminalPaymentsPermissions.terminalPaymentReceiptsFields;
    public static addTerminalPaymentReceiptsFields = ADD + TerminalPaymentsPermissions.terminalPaymentReceiptsFields;
    public static updateTerminalPaymentReceiptsFields = UPDATE + TerminalPaymentsPermissions.terminalPaymentReceiptsFields;
    public static removeTerminalPaymentReceiptsFields = REMOVE + TerminalPaymentsPermissions.terminalPaymentReceiptsFields;

    // TERMINAL RECEIPTS
    private static terminalReceipts = 'TerminalReceipts';
    private static terminalReceiptsFields = 'TerminalReceipts' + FIELDS;

    public static findTerminalReceipts = FIND + TerminalPaymentsPermissions.terminalReceipts;
    public static addTerminalReceipts = ADD + TerminalPaymentsPermissions.terminalReceipts;
    public static updateTerminalReceipts = UPDATE + TerminalPaymentsPermissions.terminalReceipts;
    public static removeTerminalReceipts = REMOVE + TerminalPaymentsPermissions.terminalReceipts;

    public static findTerminalReceiptsFields = FIND + TerminalPaymentsPermissions.terminalReceiptsFields;
    public static addTerminalReceiptsFields = ADD + TerminalPaymentsPermissions.terminalReceiptsFields;
    public static updateTerminalReceiptsFields = UPDATE + TerminalPaymentsPermissions.terminalReceiptsFields;
    public static removeTerminalReceiptsFields = REMOVE + TerminalPaymentsPermissions.terminalReceiptsFields;
}