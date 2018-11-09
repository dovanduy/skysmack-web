import { Dictionary } from 'framework/models/dictionary';

export class EnumHelpers {
    /**
     * Turns an enum from
     * {
     *     Reserved: "reserved"
     * }
     * to
     * {
     *     0: "reserved"
     * }
     */
    public static toIndexEnum(targetEnums: Dictionary<string>): Dictionary<string> {
        const processed = {};
        let index = 0;
        Object.keys(targetEnums).forEach(key => {
            processed[index] = targetEnums[key];
            index++;
        });
        return processed;
    }
}
