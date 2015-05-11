# Data Manager Model Field Data Types

This document describes the Data Types available for Model Fields.

- **[Primitive Types](#primitive-types)**
    - [Text](#text)
    - [Number](#number)
    - [Decimal](#decimal)
    - [Boolean](#boolean)
- **[Convenience Types](#convenience-types)**
    - [ID](#id)
    - [DateTime](#datetime)
    - [Location](#location)
    - [eMail](#email)
    - [URL](#url)
    - [Phone](#phone)
    - [JSON](#json)
- **[Linked Types](#linked-types)**
    - [Entry](#entry)
    - [Entries](#entries)
    - [Asset](#asset)
    - [Assets](#assets)

# Primitive Types

## Text
A simple string value of any length. For common formats, better use [Convenience Types](#convenience-types]).

## Number
A signed integer number. Keep integer limits in mind.

## Decimal
A floating point number. Keep precision limits in mind.

## Boolean
A simple true/false flag.

# Convenience Types
These types are more complex types with a specific domain that abstract from primitive types.

## ID
Unique identification for an entry. This is an own, non-resuable type.

## DateTime
A date and/or time data type in [RFC3339](https://tools.ietf.org/html/rfc3339) format (always including Time Zone).

## Location
A latitude/longitude definition of a location. Uses the JSON schema [http://json-schema.org/geo](http://json-schema.org/geo).
Is represented as a JSON Object with keys `latitude` and `longitude`.

## eMail
A valid eMail address.

## URL
A valid URL. 

## Phone
A valid Phone number according to [E.164](http://www.itu.int/rec/T-REC-E.164/en). Will automatically formatted in international format according to the default locale of the Data Manager.

##JSON 
A generic JSON object.


# Linked Types

## Entry
Link to a single entry that is related to this one.

## Entries
Link to entries that are related to this one.

## Asset
Link to a single asset that is related to this entry.

## Assets
Link to assets that are related to this one.
