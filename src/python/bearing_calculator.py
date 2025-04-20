
import math

def calculate_bearing_reactions(rpm, p1, p2, pt, pr, w, lf, life_hours, distance1, distance2, distance3):
    # Belt force total
    ptotal = p1 + p2

    # Vertical Reaction at Bearing 2
    rv2 = ((pr * distance1) + (w * (distance1 + distance2 + distance3))) / (distance1 + distance2)
    # Vertical Reaction at Bearing 1
    rv1 = pr + w - rv2

    # Horizontal Reaction at Bearing 2
    rh2 = ((pt * distance1) + (ptotal * (distance1 + distance2 + distance3))) / (distance1 + distance2)
    # Horizontal Reaction at Bearing 1
    rh1 = rh2 - pt - ptotal

    # Reactions in Bearing 1 & 2
    r1 = math.sqrt(rv1**2 + rh1**2)
    r2 = math.sqrt(rv2**2 + rh2**2)

    # Dynamic Load Calculation
    llr = (60 * rpm * life_hours) / 1_000_000
    c1 = r1 * (llr ** (1/3)) * lf
    c2 = r2 * (llr ** (1/3)) * lf

    # Bearing Selection for Bearing 1
    bearing1_designation = ""
    if 0 < c1 < 1480:
        bearing1_designation = "6000"
    elif 1480 < c1 < 4620:
        bearing1_designation = "61800"
    elif 4620 < c1 < 5070:
        bearing1_designation = "6200"
    else:
        bearing1_designation = "6300"

    # Bearing Selection for Bearing 2
    bearing2_designation = ""
    if 0 < c2 < 2700:
        bearing2_designation = "61805"
    elif 2700 < c2 < 7020:
        bearing2_designation = "16404"
    elif 7020 < c2 < 9360:
        bearing2_designation = "6004"
    elif 9360 < c2 < 12700:
        bearing2_designation = "6204"
    elif 12700 < c2 < 15900:
        bearing2_designation = "6304"
    else:
        bearing2_designation = "6404"

    return {
        'rv1': round(rv1, 4),
        'rv2': round(rv2, 4),
        'rh1': round(rh1, 4),
        'rh2': round(rh2, 4),
        'r1': round(r1, 4),
        'r2': round(r2, 4),
        'c1': round(c1, 4),
        'c2': round(c2, 4),
        'bearing1_designation': bearing1_designation,
        'bearing2_designation': bearing2_designation
    }

if __name__ == "__main__":
    # Example usage with sample inputs
    result = calculate_bearing_reactions(
        rpm=1500,
        p1=100,
        p2=50,
        pt=200,
        pr=100,
        w=50,
        lf=1.2,
        life_hours=20000,
        distance1=100,
        distance2=150,
        distance3=50
    )
    print("Results:", result)
