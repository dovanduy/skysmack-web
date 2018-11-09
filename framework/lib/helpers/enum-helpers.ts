import { StrIndex } from './../models/indexes';

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
    public static toIndexEnum(targetEnums: StrIndex<string>): StrIndex<string> {
        const processed = {};
        let index = 0;
        Object.keys(targetEnums).forEach(key => {
            processed[index] = targetEnums[key];
            index++;
        });
        return processed;
    }
}
