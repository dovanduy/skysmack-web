export enum AvailabilityRestriction {
    Open = 1 << 0,
    ClosedToArrival = 1 << 1,
    ClosedToDeparture = 1 << 2,
    Closed = AvailabilityRestriction.ClosedToArrival | AvailabilityRestriction.ClosedToDeparture,
}