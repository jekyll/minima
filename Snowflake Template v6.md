---
jupyter:
  jupytext:
    formats: ipynb,md
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.17.3
  kernelspec:
    display_name: Python 3 (ipykernel)
    language: python
    name: python3
---

<!-- #region editable=true slideshow={"slide_type": ""} -->
# SETUP
<!-- #endregion -->

```python editable=true slideshow={"slide_type": ""}
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import re
import geopy
import plotly.express as px
import ast
import json
from pd_replicator import replicator
from datetime import datetime
import gc
```

```python
pd.set_option('display.float_format', lambda x: '%.2f' % x)
pd.set_option('mode.use_inf_as_na', True)
pd.set_option('display.max_rows', 200)
pd.set_option('display.max_columns', 200)
sns.set(rc={'figure.figsize':(10,6)})
# Graphics in SVG format are more sharp and legible
%config InlineBackend.figure_format = 'svg'
```

```python
import warnings

warnings.simplefilter(action='ignore', category=pd.errors.PerformanceWarning)

```

```python
print("Mayuresh is teaching us to install github")
```

# FUNCTION AND CONSTANT DEFINITIONS


<span style="color:blue"> **REMEMBER TO CHANGE THIS FOR EACH REPORT** </span>

This_mth is usually the last month for which you want the data for


```python editable=true slideshow={"slide_type": ""}
this_mth = '2025-07'
this_mth_minus_12 = '2024-08'
this_mth_minus_24 = '2023-08'
current_year = 2025
```

```python
pctiles = [0.05,0.1,0.25,0.5,0.75,0.9,0.95] 

```

**Define functions being used**

```python
def to_1D(series):
 return pd.Series([x for _list in series for x in _list])
```

```python
def percentile(n):
    def percentile_(x):
        return np.nanpercentile(x, n)
    percentile_.__name__ = 'percentile_%s' % n
    return percentile_
```

# IMPORT DATA


<span style="color:orange"> **SID TO DO LATER: CHANGE THE CSV NAMES FOR IMPORTING LATER** </span>



### Importing Raw Data

These are raw data files downloaded as csv from Snowflake

```python
#List of filenames and corresponding variable names

filenames = ['assets_sf.csv', 'deals_sf.csv', 'investors_sf.csv','assets_all_automated.csv']
variable_names = ['assets', 'deals','investors','assets_automated']

# #Loop through filenames and read each one into a variable
for filename, varname in zip(filenames, variable_names):
   globals()[varname] = pd.read_csv(filename)

```

### Importing Mapping files

These are created locally in the data folder

```python
# List of filenames and corresponding variable names
filenames = ['country_names.csv', 'sector_mapping.csv', 'owner_pct_mapping.csv','deal_pct_mapping.csv']
variable_names = ['country_names', 'sector_mapping','owner_pct_mapping','deal_pct_mapping']

# Loop through filenames and read each one into a variable
for filename, varname in zip(filenames, variable_names):
    globals()[varname] = pd.read_csv(filename)
```

### Importing Override Files

These are manual overrides files for the investor ranking table where we think EV is wrongly calculated

```python
# List of filenames and corresponding variable names
filenames = ['investor_ranking_override.csv','investor_ranking_override_us.csv']
variable_names = ['investor_ranking_override','investor_ranking_override_us']

# Loop through filenames and read each one into a variable
for filename, varname in zip(filenames, variable_names):
    globals()[varname] = pd.read_csv(filename)
```

# DATA PREPERATION


## Assets Data Prep

```python
assets['ownership'].value_counts()
```

### Coverting to List from Str

```python

assets['owner_ids'] = assets['owner_ids'].fillna('[]')
assets['owner_ids']=  assets['owner_ids'].apply(eval)  


assets['owner_names'] = assets['owner_names'].fillna('[]')
assets['owner_names'] =  assets['owner_names'].apply(eval)  


assets['owner_shares'] = assets['owner_shares'].fillna('[]')
assets['owner_shares'] =  assets['owner_shares'].apply(eval)  
```

### Converting to USD

```python
USD_TO_EUR = assets[assets['currency'] == 'USD']['currency_to_eur'].value_counts(dropna=False).idxmax()
USD_TO_EUR
```

```python
assets['revenue_fte_ratio_usd'] = assets['revenue_fte_ratio_eur'] / USD_TO_EUR
assets['revenue_usd'] = assets['revenue_eur'] / USD_TO_EUR
assets['revenue_with_ai_generated_usd'] = assets['revenue_with_ai_generated_eur'] / USD_TO_EUR
assets['ebitda_usd'] = assets['ebitda_eur'] / USD_TO_EUR
```

### Mapping to regions

```python
#we rename "region" column to "country_code" so it does not interfere with "region" column in "country_names" dataset
assets = assets.rename(columns={"region":"country_code"})
#then we merge "country_names" dataset with "deals" dataset so we have regions (US, Europe) colum appended
assets = pd.merge(assets, country_names, left_on = 'country_code', right_on = 'country_code', how="left")



```

```python
assets_automated['asset_id'] = assets_automated['id']
assets_automated = assets_automated.rename(columns={"region":"country_code"})
assets_automated = pd.merge(assets_automated, country_names, left_on = 'country_code', right_on = 'country_code', how="left")

```

```python
region_mapping = {
    "West": [
        "California", "Oregon", "Washington", "Hawaii", "Alaska",  
        "Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming"  
    ],
    "Midwest": [
        "Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin", 
        "Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota"  
    ],
    "South": [
        "Delaware", "District of Columbia", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "West Virginia", 
        "Alabama", "Kentucky", "Mississippi", "Tennessee", 
        "Arkansas", "Louisiana", "Oklahoma", "Texas"  
    ],
    "Northeast": [
        "Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont",  
        "New Jersey", "New York", "Pennsylvania"  
    ]
}

def map_us_region(state):
    for region, states in region_mapping.items():
        if state in states:
            return region
    return "Other"  # Fallback in case a state isn't found
```

```python
#Note this was changed from headquarters_region_map before

assets['us_sub_region_map'] = assets['headquarters_region'].apply(map_us_region)
```

```python
# This is old mapping for the US. Keeping it here if we need it for later.

'''
region_mapping = {
    "West Coast": ["California", "Oregon", "Washington", "Hawaii"],
    "Mountain": ["Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming", "Alaska"],
    "Midwest": ["Iowa", "Kansas", "Missouri", "Nebraska", "North Dakota", "South Dakota", "Indiana"],
    "Great Lakes": ["Illinois", "Michigan", "Minnesota", "Ohio", "Wisconsin"],
    "New England": ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont"],
    "Mid-Atlantic": ["Delaware", "District of Columbia", "Maryland", "New Jersey", "New York", "Pennsylvania", "Virginia"],
    "South": ["Arkansas", "Kentucky", "Louisiana", "Oklahoma", "Tennessee", "Texas", "West Virginia"],
    "Southeast": ["Alabama", "Florida", "Georgia", "Mississippi", "North Carolina", "Puerto Rico", "South Carolina"]
}

   '''
```

### Extracting Yearly Financial Metrics

Revenue, EBITDA etc.

```python editable=true slideshow={"slide_type": ""}
# Metrics and their corresponding type arrays (e.g. dicslosed or verified or estimate)

metrics_with_type = {
    'revenue': 'revenue_type_array',
    'ebitda': 'ebitda_type_array',
     'ebit': 'ebit_type_array',
    'eps': 'eps_type_array',
    'fte': 'fte_type_array',
    'net_income': 'net_income_type_array'
}

# All metrics to parse
metrics = [
    'revenue', 
    'ebitda',
    'capex', 
   # 'capital', 
   # 'cash', 
    'debt',
    'net_debt', 
    'gross_margin', 
   # 'inventories', 
   # 'payables',
   # 'receivables', 
    'free_cash_flow', 
    'net_income', 
    'eps', 
    'fte'
]

# Helper function to parse JSON safely
def safe_json_loads(x):
    if isinstance(x, str):
        try:
            return json.loads(x)
        except json.JSONDecodeError:
            return []
    return x

# Apply JSON parsing
assets['years_array'] = assets['years_array'].fillna('[]').apply(safe_json_loads)


for metric in metrics:
    assets[f'{metric}_array'] = assets[f'{metric}_array'].fillna('[]').apply(safe_json_loads)

for metric, type_field in metrics_with_type.items():
    assets[type_field] = assets[type_field].fillna('[]').apply(safe_json_loads)

# Define years to extract
years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

# Build per-year columns with filtering on type
for metric in metrics:
    for year in years:
        col_name = f"{metric}_{year}"
        if metric in metrics_with_type:
            type_field = metrics_with_type[metric]
            assets[col_name] = assets.apply(
                lambda row: float(row[f"{metric}_array"][row['years_array'].index(str(year))])
                if (
                    str(year) in row['years_array']
                    and row[f"{metric}_array"][row['years_array'].index(str(year))] not in [None, "", "null"]
                    and row[type_field][row['years_array'].index(str(year))] in ['disclosed', 'verifiedSource']
                )
                else np.nan,
                axis=1
            )
        else:
            assets[col_name] = assets.apply(
                lambda row: float(row[f"{metric}_array"][row['years_array'].index(str(year))])
                if str(year) in row['years_array'] and row[f"{metric}_array"][row['years_array'].index(str(year))] not in [None, "", "null"]
                else np.nan,
                axis=1
            )
```

### Converting Financials to EUR

```python
year_cols = [
    col for col in assets.columns 
    if any(str(y) in col for y in years) and not col.startswith("fte_")
]

for col in year_cols:
    assets[col] = assets[col] * assets["currency_to_eur"]

```

```python
year_cols
```

### Adding yearly Net Debt / EBITDA, Capex / Sales

```python

for year in years:
    year_str = str(year)

    # Only calculate net debt / ebitda where ebitda is positive
    ebitda_col = f'ebitda_{year_str}'
    net_debt_col = f'net_debt_{year_str}'
    nd_by_ebitda_col = f'net_debt_by_ebitda_{year_str}'

    mask = assets[ebitda_col] > 0
    assets.loc[mask, nd_by_ebitda_col] = assets.loc[mask, net_debt_col] / assets.loc[mask, ebitda_col]

    # Calculate capex to sales (revenue) ratio
    capex_col = f'capex_{year_str}'
    revenue_col = f'revenue_{year_str}'
    capex_to_sales_col = f'capex_to_sales_{year_str}'

    assets[capex_to_sales_col] = assets[capex_col] / assets[revenue_col]



#for year in years:
 #       assets.loc[assets['ebitda_' + str(year)] > 0,'net_debt_by_ebitda_' + str(year)] = assets['net_debt_' + str(year)] / assets['ebitda_' + str(year)]
  #      assets.loc[:,'capex_to_sales_' + str(year)] = assets['capex_' + str(year)] / assets['revenue_' + str(year)]
```

Last reported value

```python
assets['capex_to_sales']=assets['capex_eur']/assets['revenue_eur']
```

### Adding YoY numbers

```python
metric_for_growth = 'revenue'

# Generate year-over-year pairs from 2013 to 2025
year_pairs = [(y1, y0) for y0, y1 in zip(range(2013, 2024), range(2014, 2025))]

# Calculate change columns
for y1, y0 in year_pairs:
    col_name = f"{metric_for_growth}_chg_{y1}_{y0}"
    assets[col_name] = assets[f"{metric_for_growth}_{y1}"] / assets[f"{metric_for_growth}_{y0}"]
```

<!-- #region editable=true slideshow={"slide_type": ""} -->
### Adding CAGRs
<!-- #endregion -->

```python
metrics_for_CAGR = ['revenue', 'ebitda','fte']

for metric in metrics_for_CAGR:
    assets[f'{metric}_chg_2022_2017'] = (assets[f'{metric}_2022'] / assets[f'{metric}_2017'])**(1/5) - 1
    assets[f'{metric}_chg_2023_2018'] = (assets[f'{metric}_2023'] / assets[f'{metric}_2018'])**(1/5) - 1
    assets[f'{metric}_chg_2022_2019'] = (assets[f'{metric}_2022'] / assets[f'{metric}_2019'])**(1/3) - 1
    assets[f'{metric}_chg_2023_2020'] = (assets[f'{metric}_2023'] / assets[f'{metric}_2020'])**(1/3) - 1
    assets[f'{metric}_chg_2023_2019'] = (assets[f'{metric}_2023'] / assets[f'{metric}_2019'])**(1/4) - 1
    assets[f'{metric}_chg_2023_2021'] = (assets[f'{metric}_2023'] / assets[f'{metric}_2021'])**(1/2) - 1
    assets[f'{metric}_chg_2024_2019'] = (assets[f'{metric}_2024'] / assets[f'{metric}_2019'])**(1/5) - 1
```

### Adding EBITDA margins

```python
ebitda_years = list(range(2013, 2025))  # 2013 to 2024 inclusive

for year in ebitda_years:
    revenue_col = f'revenue_{year}'
    ebitda_col = f'ebitda_{year}'
    margin_col = f'EBITDA_Margin_{year}'

    assets[margin_col] = assets.apply(
        lambda row: row[ebitda_col] / row[revenue_col]
        if pd.notnull(row[ebitda_col]) and pd.notnull(row[revenue_col]) and row[revenue_col] != 0
        else np.nan,
        axis=1
    )
```

### Adding revenue, EBITDA and FTE for NaN datapoints

<!-- #region -->
<span style="color:orange"> **LATER: SID TO CHECK THIS CODE AND SEE HOW MUCH IT IMPACTS** </span>


Check the code once and we are not using EBITDA code for now
<!-- #endregion -->

```python
# Step 1: Parse average FTE from fte_range
def parse_avg_fte(rng):
    try:
        low, high = map(float, rng.split('-'))
        return (low + high) / 2
    except:
        return np.nan

# Fill missing FTE using fte_range
assets['fte_range_avg'] = assets['fte_range'].apply(parse_avg_fte)
assets['estimated_fte'] = assets['fte']
assets.loc[assets['estimated_fte'].isna(), 'estimated_fte'] = assets['fte_range_avg']

# Step 2: Compute sub-sector level median revenue per FTE
sub_sector_median_revenue_per_fte = (
    assets
    .drop(columns=['subsector'])  # Exclude the grouping column from the apply input
    .groupby(assets['subsector'], group_keys=False)
    .apply(lambda df: (df['revenue'] / df['estimated_fte'])[df['estimated_fte'] > 0].median())
    .to_dict()
)



# Step 3: Define logic to estimate revenue
def estimate_revenue(row):
    if pd.notnull(row['revenue']):
        return row['revenue']
    elif pd.notnull(row['revenue_with_ai_generated']):
        return row['revenue_with_ai_generated']
    elif pd.notnull(row['estimated_fte']) and row['subsector'] in sub_sector_median_revenue_per_fte:
        return row['estimated_fte'] * sub_sector_median_revenue_per_fte[row['subsector']]
    else:
        return np.nan

# Step 4: Apply estimation
assets['estimated_revenues'] = assets.apply(estimate_revenue, axis=1)
assets['estimated_revenues_calc_eur'] = assets['estimated_revenues'] * assets['currency_to_eur']


# EBITDA addition
assets['estimated_ebitda'] = assets['ebitda'].combine_first(assets['ebitda_with_ai_generated'])


len(assets[assets['estimated_revenues'].isnull()])/len(assets)

```

### Adding Growth metrics

```python
# Define the growth metrics and target period list
growth_metrics = [
    'revenue_growth', 'ebitda_growth', 'ebit_growth', 'fte_growth', 'gross_margin_growth'
]
period = ['oneYear', 'twoYears', 'threeYears', 'threeMonths', 'sixMonths']

# Helper function to extract growth value by period
def extract_growth_value(row, metric, p):
    period_array = row['growth_period_array']
    values_array = row[f'{metric}_array']
    if isinstance(period_array, list) and isinstance(values_array, list):
        try:
            index = period_array.index(p)
            val = values_array[index]
            return float(val) if val not in [None, "", "null"] else np.nan
        except ValueError:
            return np.nan
    return np.nan

# Apply safe_json_loads to all growth arrays including the period array
for metric in growth_metrics + ['growth_period']:
    assets[f'{metric}_array'] = assets[f'{metric}_array'].fillna('[]').apply(safe_json_loads)

# Create new columns for each metric and period
for metric in growth_metrics:
    for p in period:
        col_name = f"{metric}_{p.lower()}"
        assets[col_name] = assets.apply(lambda row: extract_growth_value(row, metric, p), axis=1)
```

### Creating bands

Note: this is EUR, as we go ahead would need more USD as well


**Revenue Bands**

```python
def revenue_range(revenue):
    # First check revenue ranges
    if revenue < 50:
        return "1_small_lt_50m_eur"
    elif 50 <= revenue < 250:
        return "2_medium_50_250m_eur"
    elif 250 <= revenue < 1000:
        return "3_large_250_1000m_eur"
    elif revenue >= 1000:
        return "4_mega_large_gt_1bn_eur"
    else:
        return "5_unknown"

# Apply the function to the DataFrame
assets['revenue_range'] = assets['revenue_eur'].apply(revenue_range)
```

**EBITDA Bands**

```python
def ebitda_range(ebitda):
    # First check revenue ranges
    if ebitda < 10:
        return "1_small_lt_10m_eur"
    elif 10 <= ebitda < 50:
        return "2_medium_10_50m_eur"
    elif 50 <= ebitda < 200:
        return "3_large_50_200m_eur"
    elif ebitda >= 200:
        return "4_mega_large_gt_200m_eur"
    else:
        return "5_unknown"

# Apply the function to the DataFrame
assets['ebitda_range'] = assets['ebitda_eur'].apply(ebitda_range)
```

**Add-on Bands**

```python
assets['add_on_band'] = pd.cut(assets['add_on_deal_count_l5y'], bins = [-1,0,2,5,1000])

```

### Creating new other columns

```python
assets["cnt"] = 1
```

```python
assets['count_owners']=assets['owner_ids'].apply(lambda x: len(x))
```

```python
def calculate_company_age(year_founded):
    if pd.isna(year_founded):
        return np.nan
    else:
        return current_year - year_founded

# Applying the function to the 'year_founded' column to create 'company_age' column
assets['company_age'] = assets['year_founded'].apply(calculate_company_age)
```

```python
assets['ebitda_eur_pos'] = assets[assets['ebitda_eur']>0]['ebitda_eur']
```

### Creating filters assets datasets

```python
assets_EU = assets[assets['region']=='Europe']
assets_EU_PE = assets_EU[assets_EU["ownership"].isin(["regular", "minority"])]
```

```python
assets_NA = assets[assets["region"]=="North America"]
assets_NA_PE = assets_NA[assets_NA["ownership"].isin(["regular", "minority"])]
```

```python
assets_EU_PE_majority = assets_EU_PE[assets_EU_PE['ownership']=='regular']
assets_EU_PE_ex_fin = assets_EU_PE[assets_EU_PE['sector'] != 'financial']
```

### Coverage Test

```python
assets.groupby(['subsector'])[['revenue_chg_2023_2022','revenue_chg_2022_2021']].count().sort_values(by='revenue_chg_2023_2022')
```

```python editable=true slideshow={"slide_type": ""}
#to_1D(assets['fte_array']).value_counts(dropna = False).sort_index() / len(assets['years_array'])

fte_columns = [col for col in assets.columns if col.startswith('fte_') and col[4:].isdigit()]
fte_fill_rates = assets[fte_columns].notnull().mean().sort_index()
fte_fill_rates

```

```python
cols = [c for c in assets if c.startswith('revenue_') and c[8:].isdigit()]
fill_rates_rev = assets[assets['ownership'] != 'listed'][cols].notna().mean().sort_index()
fill_rates_rev

```

```python
#to_1D(assets['ebitda_years']).value_counts(dropna = False).sort_index() / len(assets['ebitda_years'])

cols = [c for c in assets_EU_PE if c.startswith('ebitda_') and c[8:].isdigit()]
fill_rates_EU_PE_EBITDA = assets_EU_PE[assets_EU_PE['ownership'] != 'listed'][cols].notna().mean().sort_index()
fill_rates_EU_PE_EBITDA
#to_1D(assets_EU_PE[assets_EU_PE['ownership']!='listed']['revenue_years']).value_counts(dropna = False).sort_index() / len(assets_EU_PE['revenue_years'])
```

```python
#to_1D(assets['ebitda_pct_revenue_years']).value_counts(dropna = False).sort_index() / len(assets['ebitda_pct_revenue_years'])

cols = [c for c in assets if c.startswith('EBITDA_Margin_') and c[8:].isdigit()]
fill_rates_EBITDA_margin = assets[assets['ownership'] != 'listed'][cols].notna().mean().sort_index()
fill_rates_EBITDA_margin
#to_1D(assets_EU_PE[assets_EU_PE['ownership']!='listed']['revenue_years']).value_counts(dropna = False).sort_index() / len(assets_EU_PE['revenue_years'])
```

**EBITDA and Revenue Coverage**


**Not much AI generated revenue and EBITDA in the UK & Europe**

```python
assets[assets['sub_region_2']=='UK']['revenue_is_ai_generated'].value_counts()
```

```python
assets[assets['sub_region_2']=='UK']['ebitda_is_ai_generated'].value_counts()
```

```python
assets[assets['region']=='Europe']['revenue_is_ai_generated'].value_counts()
```

```python
assets[assets['region']=='Europe']['ebitda_is_ai_generated'].value_counts()
```

**Even though EBITDA and Revenue numbers are still missing in Europe**

```python
assets[assets['region']=='Europe']['ebitda_eur'].isna().value_counts()
```

```python
assets[assets['region']=='Europe']['revenue_eur'].isna().value_counts()
```

## Investors Data Prep


**Create a alias investor id database**

Sometimes the investor id is missing even if the buyer name is present.. so you could use this mapping to lookup investor id and create a richer database. Also work with Basil to fix these.

```python

df = investors[['investor_id', 'investor_name', 'aliases']].copy()

# Split by NaNs
alias_missing = df[df['aliases'].isna()].copy()
alias_present = df[df['aliases'].notna()].copy()

# Fix NaNs: use name as alias
alias_missing['aliases'] = alias_missing['investor_name']

# Convert stringified lists to real lists
alias_present['aliases'] = alias_present['aliases'].apply(ast.literal_eval)

# Append `name` to each list
alias_present['aliases'] = alias_present.apply(
    lambda row: row['aliases'] + [row['investor_name']], axis=1
)

# Explode the list
alias_present = alias_present.explode('aliases')

# Combine the two subsets
investors_alias = pd.concat([alias_missing, alias_present], ignore_index=True)

# Final cleanup and column order
investors_alias = investors_alias[['investor_id', 'aliases', 'investor_name']]
investors_alias

```

```python
investors_alias[investors_alias['investor_id']==8]
```

```python
# Step 1: Build alias → investor_id mapping
alias_to_id = investors_alias.set_index('aliases')['investor_id'].to_dict()
```

```python
# Step 1: Build investor_id → name mapping
alias_to_name = investors.set_index('investor_id')['investor_name'].to_dict()
```

```python
investors.info(verbose = True)
```

### Mapping region

```python

# Already solved in snowflake investors = investors.rename(columns={"operational_hq_country_code": "investor_country_code"})
# Already solved in snowflake investors = investors.rename(columns={"operational_hq_city": "investor_hq_city"})
investors = pd.merge(investors, country_names, left_on = 'investor_country_code', right_on = 'country_code', how='left')
investors.drop(columns=['country_code'], inplace=True)
investors = investors.rename(columns={"country_name": "investor_country_name"})
investors = investors.rename(columns={"region": "investor_region"})
investors = investors.rename(columns={"sub_region": "investor_sub_region"})
```

### Converting to List

```python
investors['asset_id'].fillna('[]', inplace= True)  
investors['asset_id'] = investors['asset_id'].apply(eval) 
```

### Other data prep

```python
investors['funds_raised_last_five_years'] = (
    investors['funds_raised_last_five_years'].replace(0, np.nan))
```

```python
investors['funds_raised_last_five_years_eur'] = (
    investors['funds_raised_last_five_years_eur']
    .replace(0, '-')
    .replace(np.nan, '-')
)
```

```python
investors['count_assets'] = investors['asset_id'].apply(lambda x: len(x))
```

### Converting fundraising to USD

```python
investors['funds_raised_last_five_years_usd'] = (
    pd.to_numeric(investors['funds_raised_last_five_years_eur'], errors='coerce') / USD_TO_EUR
)

```

```python
investors['funds_raised_last_five_years_usd'].fillna("-",inplace = True)
```

## Deals Data Prep


### Evaluate Arrays


**Filling NAN arrays with blanks so it is possible to then eval them**

```python
columns_to_fill = [
    'buyer_linked_ids',
    'buyer_names',
    'buyer_leading_parties',
    'buyer_share_values',
    'buyer_share_pcts',
    'buyer_types',

    'seller_linked_ids',
    'seller_names',
    'seller_leading_parties',
    'seller_share_values',
    'seller_share_pcts',
    'seller_types'
]

for column in columns_to_fill:
    deals[column] = deals[column].fillna('[]')
```

**Preserving str versions of arrays for analysis before convering them to a list**

```python
#Preserving the str names to be able to query later

deals['buyer_names_str'] = deals['buyer_names']
deals['seller_names_str'] = deals['seller_names']

deals['buyer_types_str'] = deals['buyer_types']
deals['seller_types_str'] = deals['seller_types']

deals['buyer_share_values_str'] = deals['buyer_share_values']
deals['seller_share_values_str'] = deals['seller_share_values']

```

**Converting to list types**

```python
columns_to_eval = {
    'buyer_linked_ids': 'buyer_linked_ids',
    'buyer_names': 'buyer_names',
    'buyer_leading_parties': 'buyer_leading_parties',
    'buyer_share_values': 'buyer_share_values',
    'buyer_share_pcts': 'buyer_share_pcts',
    'buyer_types':'buyer_types',

    'seller_linked_ids': 'seller_linked_ids',
    'seller_names': 'seller_names',
    'seller_leading_parties': 'seller_leading_parties',
    'seller_share_values': 'seller_share_values',
    'seller_share_pcts': 'seller_share_pcts',
    'seller_types':'seller_types'
}

for input_column, output_column in columns_to_eval.items():
    deals[output_column] = deals[input_column].apply(eval)
```

### Creating announcement date column



**Creating the announcement date column**



There are some missing months

```python
deals['announcement_date_month'].value_counts(dropna = False).sort_index()
```

Also feel the automated deals are randamoly skewed towards january

```python
deals[['type','announcement_date_month']].value_counts(dropna = False).sort_index()
```

```python
# Ensure columns are nullable integers
deals['announcement_date_year'] = deals['announcement_date_year'].astype('Int64')
deals['announcement_date_month'] = deals['announcement_date_month'].astype('Int64')
```

```python
deals.loc[deals['announcement_date_month'] == 0, 'announcement_date_month'] = pd.NA
```

```python
#assigning random numbers to missing month based on the month frequency of only curated deals

month_distribution = deals[deals['type']=='curated']['announcement_date_month'].value_counts(normalize=True)

# Function to randomly assign month based on the distribution
def assign_random_month():
    return np.random.choice(month_distribution.index, p=month_distribution.values)

# Assign random month to missing 'announcement_date_month' based on the distribution
deals['announcement_date_month'] = deals['announcement_date_month'].apply(
    lambda x: x if pd.notna(x) else assign_random_month()
).astype('Int64')
```

```python
deals['announcement_date_month'].value_counts(dropna = False)
```

```python
deals['announcement_date'] = pd.NA

deals['announcement_date'] = (
    deals['announcement_date_year'].astype(str) + '-' +
    deals['announcement_date_month'].astype(str).str.zfill(2)
)
```

### Adding quarters to deals

```python
deals = deals[deals['announcement_date_year'].notna()]
```

```python
deals['announcement_date_quarter'] = pd.to_datetime(
    deals['announcement_date_year'].astype(int).astype(str) + '-' + 
    deals['announcement_date_month'].astype('Int64').astype(str), 
    format='%Y-%m', errors='coerce'
).dt.to_period('Q')
```

### Changing publication date

```python
deals['publication_date'] = pd.to_datetime(deals['publication_date'], utc=True)
```

```python
deals['publication_date_year_month'] = deals['publication_date'].dt.strftime('%Y-%m')
```

### Mapping regions and sectors


**Adding region info**

```python
#we rename "region" column to "country_code" so it does not interfere with "region" column in "country_names" dataset
deals = deals.rename(columns={"region":"country_code"})

#then we merge "country_names" dataset with "deals" dataset so we have regions (US, Europe) colum appended
deals = pd.merge(deals, country_names, left_on = 'country_code', right_on = 'country_code', how="left")
```

<span style="color:orange"> **REQUEST ENGINEERING: US STATE INFO NOT PRESENT IN DEALS** </span>


```python
#Note this was changed from headquarters_region_map before
#deals['us_sub_region_map'] = assets['headquarters_region'].apply(map_region)
```

**Fill missing sectors and lookup**

We are overwriting sectors based on subsectors. There were some mismatches in sectors and subsectors and also a few were nan.

```python
# Load sector mapping
sector_map = pd.read_csv('sector_mapping.csv')

# Clean whitespace
deals['subsector'] = deals['subsector'].astype(str).str.strip()
sector_map['subsector'] = sector_map['subsector'].astype(str).str.strip()
sector_map['sector'] = sector_map['sector'].astype(str).str.strip()

# Create mapping dictionary: subsector → sector
subsector_to_sector = dict(zip(sector_map['subsector'], sector_map['sector']))

# Overwrite all sector values based on mapped subsector
deals['sector'] = deals['subsector'].map(subsector_to_sector)
```

```python
deals[['sector','subsector']].value_counts(dropna = False).sort_index()
```

### Creating seperate asset and advisor id datasets 


<span style="color:orange"> **LATER SID TO CHECK: WHETHER WE NEED TO SEPERATE ASSET AND INVESTOR IDS BUYER AND SELLER IDS** </span>

**Why? Because seperate linked id's are not present in Snowflake**


```python
import ast

def extract_ids(row, id_col: str, type_col: str, match_type: str):
    # Get IDs — use only if it's a list
    ids = row[id_col] if isinstance(row[id_col], list) else []

    # Get types — handle NaN, float, str, etc.
    raw_types = row[type_col]
    if isinstance(raw_types, list):
        types = raw_types
    elif isinstance(raw_types, str):
        try:
            types = ast.literal_eval(raw_types)
            if not isinstance(types, list):
                types = []
        except:
            types = []
    else:
        types = []

    # Extract matching IDs
    return [
        id_.strip()
        for t, id_ in zip(types, ids)
        if isinstance(t, str) and t.strip().lower() == match_type
           and isinstance(id_, str) and id_.strip()
    ] or pd.NA
```

```python
# Buyer investor IDs
deals['buyer_investor_ids'] = deals.apply(
    lambda row: extract_ids(row, 'buyer_linked_ids', 'buyer_types', 'investor'), axis=1
)

# Buyer asset IDs
deals['buyer_asset_ids'] = deals.apply(
    lambda row: extract_ids(row, 'buyer_linked_ids', 'buyer_types', 'asset'), axis=1
)

# Seller investor IDs
deals['seller_investor_ids'] = deals.apply(
    lambda row: extract_ids(row, 'seller_linked_ids', 'seller_types', 'investor'), axis=1
)

# Seller asset IDs
deals['seller_asset_ids'] = deals.apply(
    lambda row: extract_ids(row, 'seller_linked_ids', 'seller_types', 'asset'), axis=1
)
```

**We are extracting buyer/seller names based on types**

Not sure if we need this in the end


```python
# Generic extraction function
def extract_names(row, name_col: str, type_col: str, match_type: str):
    # Extract names
    names = row[name_col] if isinstance(row[name_col], list) else []

    # Extract types
    raw_types = row[type_col]
    if isinstance(raw_types, list):
        types = raw_types
    elif isinstance(raw_types, str):
        try:
            types = ast.literal_eval(raw_types)
            if not isinstance(types, list):
                types = []
        except:
            types = []
    else:
        types = []

    # Extract matching names
    return [
        n.strip()
        for t, n in zip(types, names)
        if isinstance(t, str) and t.strip().lower() == match_type
           and isinstance(n, str) and n.strip()
    ] or pd.NA

# Apply to full `deals` DataFrame

# Extract seller investor names
deals['seller_investor_names'] = deals.apply(
    lambda row: extract_names(row, 'seller_names', 'seller_types', 'investor'), axis=1
)

# Extract seller asset names
deals['seller_asset_names'] = deals.apply(
    lambda row: extract_names(row, 'seller_names', 'seller_types', 'asset'), axis=1
)

# Extract buyer investor names
deals['buyer_investor_names'] = deals.apply(
    lambda row: extract_names(row, 'buyer_names', 'buyer_types', 'investor'), axis=1
)

# Extract buyer asset names
deals['buyer_asset_names'] = deals.apply(
    lambda row: extract_names(row, 'buyer_names', 'buyer_types', 'asset'), axis=1
)

```

### Further processing


<span style="color:orange"> **LATER SID TO CHECK: IF WE NEED COMBINES REASONS** </span>


```python

def combine_reason_lists(row):
    # Parse stringified lists safely
    try:
        buyer = ast.literal_eval(row['buyer_reasons']) if isinstance(row['buyer_reasons'], str) else []
    except:
        buyer = []

    try:
        seller = ast.literal_eval(row['seller_reasons']) if isinstance(row['seller_reasons'], str) else []
    except:
        seller = []

    # Combine and filter out empty strings or non-string values
    combined = [r for r in buyer + seller if isinstance(r, str) and r.strip()]
    
    # Return stringified list (like: '["foo", "bar"]') or pd.NA
    return str(combined) if combined else pd.NA

# Apply to dataframe
deals['combined_reasons'] = deals.apply(combine_reason_lists, axis=1)
```

```python
deals['combined_reasons'].value_counts().head(20)
```

**Creating the majority buyer and seller column**

If there are two it takes the first one that is listed.


**Extracting info for majority deal buyer and seller**

There are some edge cases where there are 2 majority buyers in that case you take the first listed



```python


df_summary = deals[['deal_id','buyer_linked_ids','buyer_names','buyer_share_values','buyer_types','buyer_share_pcts']]
df_summary = df_summary.explode(['buyer_linked_ids','buyer_names','buyer_share_values','buyer_types','buyer_share_pcts'])

df_summary = df_summary[df_summary['buyer_share_values'].isin(['majority','sharedMajority'])]
df_summary = df_summary.drop_duplicates(subset='deal_id', keep='first')

df_summary = df_summary.rename(columns={
    'buyer_linked_ids': 'majority_buyer_linked_id',
    'buyer_names': 'majority_buyer_name',
    'buyer_share_values': 'majority_buyer_share',
    'buyer_types': 'majority_buyer_type',
    'buyer_share_pcts': 'majority_buyer_share_pct'
})

deals = pd.merge (deals, df_summary, on ='deal_id', how = 'left')

deals['majority_buyer_linked_id'] = pd.to_numeric(deals['majority_buyer_linked_id'], errors='coerce').astype('Int64') 



```

<span style="color:orange"> **THERE IS A BIG ERROR HERE AS ALL LINKED ID's ARE NOT INVESTORS THEY ARE ASSETS AND OTHER TYPES AS WELL** </span>

The code is commented as a result for now


```python
'''
df_summary = investors[['investor_id','investor_country_name','investor_sub_region','investor_region']].copy()

df_summary.rename(columns={
    "investor_id":'majority_buyer_linked_id',
    "investor_region": "majority_buyer_region",
    "investor_country_name": "majority_buyer_country_name",
    "investor_sub_region": "majority_buyer_sub_region"
}, inplace=True)

deals = pd.merge (deals, df_summary, on ='majority_buyer_linked_id', how = 'left')

'''
```

```python

df_summary = deals[['deal_id','seller_linked_ids','seller_names','seller_share_values','seller_types','seller_share_pcts']]

df_summary = df_summary.explode(['seller_linked_ids','seller_names','seller_share_values','seller_types','seller_share_pcts'])

df_summary = df_summary[df_summary['seller_share_values'].isin(['majority','sharedMajority'])]

df_summary = df_summary.drop_duplicates(subset='deal_id', keep='first')

df_summary = df_summary.rename(columns={
    'seller_linked_ids': 'majority_seller_linked_id',
    'seller_names': 'majority_seller_name',
    'seller_share_values': 'majority_seller_share',
    'seller_types': 'majority_seller_type',
    'seller_share_pcts': 'majority_seller_share_pct'
})

deals = pd.merge(deals, df_summary, on='deal_id', how='left')

deals['majority_seller_linked_id'] = pd.to_numeric(deals['majority_seller_linked_id'], errors='coerce').astype('Int64') 


```

<span style="color:orange"> **THERE IS A BIG ERROR HERE AS ALL LINKED ID's ARE NOT INVESTORS THEY ARE ASSETS AND OTHER TYPES AS WELL** </span>

Commenting out the mapping region part for now



```python
'''df_summary = investors[['investor_id','investor_country_name','investor_sub_region','investor_region']].copy()

df_summary.rename(columns={
    "investor_id":'majority_seller_linked_id',
    "investor_region": "majority_seller_region",
    "investor_country_name": "majority_seller_country_name",
    "investor_sub_region": "majority_seller_sub_region"
}, inplace=True)

deals = pd.merge (deals, df_summary, on ='majority_seller_linked_id', how = 'left')
'''
```

### Filtering the deals table


**Removing aborted and live deals more than 24 months ago from the dataset**

```python
deals = deals[(deals['deal_status'] != 'aborted')]

deals = deals[~((deals['deal_status'] == 'live')&
             (deals['announcement_date']<this_mth_minus_24))]
```

**Creating a seperate database for automated + curated deals dataset and subsetting final deals dataset to curated only**

```python
deals_all_inc_automated = deals.copy()
```

```python
deals = deals[deals['type']=='curated']
```

## Merging Deals and Assets Dataset

```python
#drop these columns to keep ebitda and revenue range at the time of deal intact rather than look up the latest

assets_merge = assets.drop(columns=['country_code','sector','subsector','currency','fte',
                                    'fte_year','revenue','revenue_eur','revenue_year','ebitda',
                                    'ebitda_eur','ebitda_year','ebit','ebit_eur','ebit_year','total_assets','total_assets_eur',
                                    'total_assets_year','country_name','region','sub_region', 'fte', 'fte_year','ebitda_range','revenue_range'])
```

```python
deals = pd.merge(deals, assets_merge, left_on = 'linked_asset_id', right_on = 'asset_id', how="left")
```

```python
deals['ev_ebitda_multiple'].notna().sum()
```

```python
deals['ev_revenue_multiple'].notna().sum()
```

### Adding missing financials and multiples to deals

<!-- #region -->
<span style="color:orange"> **LATER SID TO CHECK: DOES THIS RESULT IN A LOT OF UPLIFT? ALSO DO FOR AUTOMATED ASSETS** </span>


**Used Linked Asset id to fill sectors for deals if not present**
<!-- #endregion -->

```python
# Step 2: Fill remaining blanks from assets DataFrame based on linked_asset_id
# (Assumes 'assets' has columns: 'id', 'sector', 'subsector')
assets_lookup = assets[['asset_id', 'sector', 'subsector']].rename(columns={'asset_id': 'linked_asset_id'})
deals = deals.merge(assets_lookup, on='linked_asset_id', how='left', suffixes=('', '_from_assets'))

# Fill missing sector/subsector from assets
deals['sector'] = deals['sector'].fillna(deals['sector_from_assets'])
deals['subsector'] = deals['subsector'].fillna(deals['subsector_from_assets'])

# Drop helper columns
deals.drop(columns=['sector_from_assets', 'subsector_from_assets'], inplace=True)
```

```python
deals['ev_revenue_multiple'].notna().sum()
```

```python
deals['ev_eur'].notna().sum()
```

<span style="color:blue"> **SID TO DO: LOOKUP DEALS FROM AUTOMATED ASSETS NOT JUST CURATED ASSETS** </span>

Issue: that where the asset is automated it's not there; think about whether revenue should be announcment data year or one year before

<!-- #region editable=true slideshow={"slide_type": ""} -->
<span style="color:orange"> **THINK WE DON'T NEED THIS NOW AS IT'S COVERED IN MIKO's CODE** </span>

Opportunity to use automated profiles data here too which you could lookup

<!-- #endregion -->

```python
'''

#Revenue at time of deal
# --- Step 1: Explode and convert revenue to EUR ---
assets_dealstest = (
    assets
    .explode(['years_array', 'revenue_array'])
    .rename(columns={
        'years_array': 'year_for_deals',
        'revenue_array': 'revenue_for_deals',
        'name': 'asset_name'
    })[
        ['asset_id', 'asset_name', 'year_for_deals', 'revenue_for_deals',
         'revenue_eur', 'currency', 'currency_to_eur']
    ]
)

# Clean and convert types
assets_dealstest['year_for_deals'] = pd.to_numeric(assets_dealstest['year_for_deals'], errors='coerce').astype('Int64')
assets_dealstest['revenue_for_deals'] = pd.to_numeric(assets_dealstest['revenue_for_deals'], errors='coerce')

# Convert to EUR if needed
assets_dealstest['revenue_at_that_year'] = np.where(
    (assets_dealstest['currency'] == 'EUR') | assets_dealstest['currency'].isna(),
    assets_dealstest['revenue_for_deals'],
    assets_dealstest['revenue_for_deals'] * assets_dealstest['currency_to_eur'].fillna(1)
)

# Keep only relevant columns for merge
assets_dealstest = assets_dealstest[['asset_id', 'asset_name', 'year_for_deals', 'revenue_at_that_year']]

# --- Step 2: Prepare deals_temp and calculate revenue_at_deal_year ---
deals_temp = deals[['deal_id', 'linked_asset_id', 'announcement_date_year', 'asset',
                    'revenue_eur', 'ev', 'ev_revenue_multiple',
                    'buyer_reasons', 'seller_reasons']].copy()

# Compute revenue_at_deal_year directly
deals_temp['revenue_at_deal_year'] = np.where(
    deals_temp['revenue_eur'].notna(),
    deals_temp['revenue_eur'],
    np.where(
        deals_temp['ev'].notna() &
        deals_temp['ev_revenue_multiple'].notna() &
        (deals_temp['ev_revenue_multiple'] != 0),
        deals_temp['ev'] / deals_temp['ev_revenue_multiple'],
        np.nan
    )
)

# --- Step 3: Merge historical revenue and backfill missing revenue_at_deal_year ---
merged_revenue = deals_temp.merge(
    assets_dealstest,
    how='left',
    left_on=['linked_asset_id', 'announcement_date_year'],
    right_on=['asset_id', 'year_for_deals']
)

merged_revenue['revenue_at_deal_year'] = np.where(
    merged_revenue['revenue_at_deal_year'].isna(),
    merged_revenue['revenue_at_that_year'],
    merged_revenue['revenue_at_deal_year']
)

# --- Step 4: Finalize deals_temp ---
deals_temp = merged_revenue.drop(columns=['asset_id', 'year_for_deals', 'revenue_at_that_year'])

deals = deals.merge(
    deals_temp[['deal_id', 'revenue_at_deal_year']],
    how='left',
    on='deal_id'
)
# --- Step 5: Continue with your workflow ---
replicator(deals)

'''
```

<span style="color:blue"> **SID TO DO: CHECK THIS CODE BY JAGADEESH** </span>


```python
#EBITDA at time of deal
'''

# --- Step 1: Explode and convert EBITDA to EUR ---
assets_ebitdatest = (
    assets
    .explode(['years_array', 'ebitda_array'])
    .rename(columns={
        'years_array': 'year_for_deals',
        'ebitda_array': 'ebitda_for_deals',
        'name': 'asset_name'
    })[
        ['asset_id', 'asset_name', 'year_for_deals', 'ebitda_for_deals',
         'currency', 'currency_to_eur']
    ]
)

# Clean and convert types
assets_ebitdatest['year_for_deals'] = pd.to_numeric(assets_ebitdatest['year_for_deals'], errors='coerce').astype('Int64')
assets_ebitdatest['ebitda_for_deals'] = pd.to_numeric(assets_ebitdatest['ebitda_for_deals'], errors='coerce')

# Convert to EUR if needed
assets_ebitdatest['ebitda_at_that_year'] = np.where(
    (assets_ebitdatest['currency'] == 'EUR') | assets_ebitdatest['currency'].isna(),
    assets_ebitdatest['ebitda_for_deals'],
    assets_ebitdatest['ebitda_for_deals'] * assets_ebitdatest['currency_to_eur'].fillna(1)
)

# Keep only relevant columns for merge
assets_ebitdatest = assets_ebitdatest[['asset_id', 'asset_name', 'year_for_deals', 'ebitda_at_that_year']]

# --- Step 2: Prepare deals_temp and calculate ebitda_at_deal_year ---
deals_temp_ebitda = deals[['deal_id', 'linked_asset_id', 'announcement_date_year', 'asset',
                           'ebitda_eur', 'ev', 'ev_ebitda_multiple']].copy()

# Compute ebitda_at_deal_year directly
deals_temp_ebitda['ebitda_at_deal_year'] = np.where(
    deals_temp_ebitda['ebitda_eur'].notna(),
    deals_temp_ebitda['ebitda_eur'],
    np.where(
        deals_temp_ebitda['ev'].notna() &
        deals_temp_ebitda['ev_ebitda_multiple'].notna() &
        (deals_temp_ebitda['ev_ebitda_multiple'] != 0),
        deals_temp_ebitda['ev'] / deals_temp_ebitda['ev_ebitda_multiple'],
        np.nan
    )
)

# --- Step 3: Merge historical ebitda and backfill missing ebitda_at_deal_year ---
merged_ebitda = deals_temp_ebitda.merge(
    assets_ebitdatest,
    how='left',
    left_on=['linked_asset_id', 'announcement_date_year'],
    right_on=['asset_id', 'year_for_deals']
)

merged_ebitda['ebitda_at_deal_year'] = np.where(
    merged_ebitda['ebitda_at_deal_year'].isna(),
    merged_ebitda['ebitda_at_that_year'],
    merged_ebitda['ebitda_at_deal_year']
)

# --- Step 4: Finalize and merge into deals ---
deals_temp_ebitda = merged_ebitda.drop(columns=['asset_id', 'year_for_deals', 'ebitda_at_that_year'])



deals = deals.merge(
    deals_temp_ebitda[['deal_id', 'ebitda_at_deal_year']],
    how='left',
    on='deal_id'
)

# --- Step 5: Continue with your workflow ---
replicator(deals)

'''
```

<span style="color:blue"> **SID TO DO: CHECK THIS MULTIPLES CODE** </span>


```python
deals['ebitda_eur'].describe()

```

```python
deals['ev_ebitda_multiple'].describe()
```

```python
# Here we are filling EV values if EBITDA and EV/EBITDA or Revenue and EV/Revenue numbers are available
mask_get_ev_from_rev = (
    deals['ev_eur'].isna() &
    (deals['revenue_eur'] > 0) &
    (deals['ev_revenue_multiple'] > 0)
)
deals.loc[mask_get_ev_from_rev, 'ev_eur'] = deals.loc[mask_get_ev_from_rev, 'revenue_eur'] * deals.loc[mask_get_ev_from_rev, 'ev_revenue_multiple']

mask_get_ev_from_ebitda = (
    deals['ev_eur'].isna() &
    (deals['ebitda_eur'] > 0) &
    (deals['ev_ebitda_multiple'] > 0)
)
deals.loc[mask_get_ev_from_ebitda, 'ev_eur'] = deals.loc[mask_get_ev_from_ebitda, 'ebitda_eur'] * deals.loc[mask_get_ev_from_ebitda, 'ev_ebitda_multiple']
```

```python
# Fill revenue if EV and EV/Revenue multiple are known
mask_get_rev_from_ev = (
    deals['revenue_eur'].isna() &
    deals['ev_eur'].notna() & (deals['ev_eur'] > 0) &
    deals['ev_revenue_multiple'].notna() & (deals['ev_revenue_multiple'] > 0)
)
deals.loc[mask_get_rev_from_ev, 'revenue_eur'] = (
    deals.loc[mask_get_rev_from_ev, 'ev_eur'] / deals.loc[mask_get_rev_from_ev, 'ev_revenue_multiple']
)

# Fill EBITDA if EV and EV/EBITDA multiple are known
mask_get_ebitda_from_ev = (
    deals['ebitda_eur'].isna() &
    deals['ev_eur'].notna() & (deals['ev_eur'] > 0) &
    deals['ev_ebitda_multiple'].notna() & (deals['ev_ebitda_multiple'] > 0)
)
deals.loc[mask_get_ebitda_from_ev, 'ebitda_eur'] = (
    deals.loc[mask_get_ebitda_from_ev, 'ev_eur'] / deals.loc[mask_get_ebitda_from_ev, 'ev_ebitda_multiple']
)

```

```python
# Get multiples from EV and Revenue and EBITDA

mask_mult_rev = (
    deals['ev_revenue_multiple'].isna() &
    (deals['ev_eur'] > 0) &
    (deals['revenue_eur'] > 0)
)
deals.loc[mask_mult_rev, 'ev_revenue_multiple'] = deals.loc[mask_mult_rev, 'ev_eur'] / deals.loc[mask_mult_rev, 'revenue_eur']

mask_mult_ebitda = (
    deals['ev_ebitda_multiple'].isna() &
    (deals['ev_eur'] > 0) &
    (deals['ebitda_eur'] > 0)
)
deals.loc[mask_mult_ebitda, 'ev_ebitda_multiple'] = deals.loc[mask_mult_ebitda, 'ev_eur'] / deals.loc[mask_mult_ebitda, 'ebitda_eur']
```

**Basically in this code, we're looking up Revenue, EBITDA and other metrics from the assets table to fill missing values**

```python
#Here we are generating revenue, ebitda and other metrics for the year of the deal, 1 year before, 1 year after etc.

for metric in ['revenue', 'ebitda', 'fte', 'net_debt']:
    for offset in [-2, -1, 0, 1]:
        colname = f'{metric}_{offset:+d}'
        year_str = (deals['announcement_date_year'] + offset).astype(str)
        source_cols = metric + '_' + year_str

        deals[colname] = [
            deals[col].iloc[i] if col in deals.columns else np.nan
            for i, col in enumerate(source_cols)
        ]
```

```python
deals['ebitda_eur'].describe()

```

```python
deals['ev_ebitda_multiple'].describe()
```

```python
#The approach we are taking here is that if the deal was announced in Q4 then we are taking the metric for that year, if it was announceed before Q4 we are taking the metric for previous year.

def fill_metric_and_year(deals, metric, metric_col, year_col):

    # Preallocate output Series
    filled_values = deals[metric_col].copy()
    filled_years = pd.Series(np.nan, index=deals.index)

    # FOR Q4 we are taking current year metrics, followed by previous year and then following year
    # FOR Q2 and Q3 we are taking previous year metrics, followed by current year then precedent year, and then next year
    # FOR Q1 we are taking current year metrics, followed by previous year and then precedent year
    
    qtr_hi = [(0, f'{metric}_+0'), (-1, f'{metric}_-1'), (+1, f'{metric}_+1')]
    qtr_lo = [(-1, f'{metric}_-1'), (0, f'{metric}_+0'), (-2, f'{metric}_-2'), (+1, f'{metric}_+1')]
    qtr_mid = [(-1, f'{metric}_-1'), (0, f'{metric}_+0'), (+1, f'{metric}_+1')]
 

    month = deals['announcement_date_month']
    base_year = deals['announcement_date_year']

    hi_mask = (month > 9) & filled_values.isna()
    lo_mask = (month < 4) & filled_values.isna()
    mid_mask = filled_values.isna() & ~(hi_mask | lo_mask)

    def fill_metrics(mask, options):
        for offset, metric_year in options:
            valid_mask = mask & deals[metric_year].notna() & filled_values.isna()
            filled_values.loc[valid_mask] = deals.loc[valid_mask, metric_year]
            filled_years.loc[valid_mask] = base_year.loc[valid_mask] + offset

    fill_metrics(hi_mask, qtr_hi)
    fill_metrics(lo_mask, qtr_lo)
    fill_metrics(mid_mask, qtr_mid)

    deals[metric_col] = filled_values
    deals[year_col] = filled_years

```

```python
# Fill values and years in one go — fast and clean
fill_metric_and_year(deals, 'revenue', 'revenue_eur', 'revenue_year')
fill_metric_and_year(deals, 'ebitda', 'ebitda_eur', 'ebitda_year')
fill_metric_and_year(deals, 'fte', 'fte', 'fte_year')



# Skipping the net debt reassigment as it's a balance sheet metric
# deals['net_debt_year'] = np.nan
#fill_metric_and_year(deals, 'net_debt', 'net_debt_eur', 'net_debt_year')

```

```python
deals['ebitda_eur'].describe()

```

```python
deals['ev_ebitda_multiple'].describe()

```

```python
# ----------------------------------------
# STEP 7: Re-impute EV using now available metrics
# ----------------------------------------
mask_ev_from_rev_2 = (
    deals['ev_eur'].isna() &
    (deals['revenue_eur'] > 0) &
    (deals['ev_revenue_multiple'] > 0)
)
deals.loc[mask_ev_from_rev_2, 'ev_eur'] = deals.loc[mask_ev_from_rev_2, 'revenue_eur'] * deals.loc[mask_ev_from_rev_2, 'ev_revenue_multiple']

mask_ev_from_ebitda_2 = (
    deals['ev_eur'].isna() &
    (deals['ebitda_eur'] > 0) &
    (deals['ev_ebitda_multiple'] > 0)
)
deals.loc[mask_ev_from_ebitda_2, 'ev_eur'] = deals.loc[mask_ev_from_ebitda_2, 'ebitda_eur'] * deals.loc[mask_ev_from_ebitda_2, 'ev_ebitda_multiple']

```

```python
# ----------------------------------------
# STEP 8: Re-impute multiples using updated metrics
# ----------------------------------------
mask_mult_rev_2 = (
    deals['ev_revenue_multiple'].isna() &
    (deals['ev_eur'] > 0) &
    (deals['revenue_eur'] > 0)
)
deals.loc[mask_mult_rev_2, 'ev_revenue_multiple'] = deals.loc[mask_mult_rev_2, 'ev_eur'] / deals.loc[mask_mult_rev_2, 'revenue_eur']

mask_mult_ebitda_2 = (
    deals['ev_ebitda_multiple'].isna() &
    (deals['ev_eur'] > 0) &
    (deals['ebitda_eur'] > 0)
)
deals.loc[mask_mult_ebitda_2, 'ev_ebitda_multiple'] = deals.loc[mask_mult_ebitda_2, 'ev_eur'] / deals.loc[mask_mult_ebitda_2, 'ebitda_eur']

```

```python
deals['ebitda_eur'].describe()

```

```python
deals['ev_ebitda_multiple'].describe()

```

## Revenue and EBITDA range mapping for deals

```python
deals['deal_revenue_range'] = deals['revenue_eur'].apply(revenue_range)
```

```python
deals['deal_ebitda_range'] = deals['ebitda_eur'].apply(ebitda_range)
```

# Creating Currency Columns

```python
deals['revenue_usd'] = deals['revenue_eur'] / USD_TO_EUR
deals['ebitda_usd'] = deals['ebitda_eur'] / USD_TO_EUR
```

# CREATING PE ENTRIES, EXITS AND ADD-ONS


## PE Entries 


### Filtering PE Entries dataset


**LOGIC**

- We don't want any VC Rounds
- We only want to include deals where atleast 1 buyer was an investor
- We also exclude current ownership as venture capital
- We don't want seller reason was an IPO because it's not a private market deal

```python
deals_novc = deals[-deals['buyer_reasons'].str.contains("(?i)vcRound",na=False)]
PE_entries = deals_novc[deals_novc['buyer_types_str'].str.contains("(?i)investor",na=False)]
PE_entries = PE_entries[PE_entries['ownership']!='ventureCapital']
PE_entries = PE_entries[~PE_entries['seller_reasons'].str.contains("(?i)IPO",na=False)]
PE_entries = PE_entries[~PE_entries['funding_round_type'].str.contains("(?i)series|seed", na=False)]

```

### Assigning entry deal types


**LOGIC**

- For a primary deal the seller type should be null or other
- For carve-out the seller type should be an asset
- For secondary the seller type should be an investor


```python
PE_entries.loc[:, 'entry_deal_type'] = 'unknown'
```

```python
PE_entries.loc[(PE_entries['seller_types_str'] == '[]')| PE_entries['seller_types_str'].str.fullmatch(r'\["other"(,\s*"other")*\]', case=False),'entry_deal_type'] = 'primary'

PE_entries.loc[PE_entries['seller_reasons'].str.contains("(?i)divestiture",na=False), 'entry_deal_type'] = 'carve-out'
PE_entries.loc[PE_entries['seller_types_str'].str.contains("(?i)asset",na=False), 'entry_deal_type'] = 'carve-out'

PE_entries.loc[PE_entries['seller_types_str'].str.contains("(?i)investor",na=False), 'entry_deal_type'] = 'secondary'

PE_entries.loc[PE_entries['majority_seller_type'].str.contains("(?i)asset",na=False), 'entry_deal_type'] = 'carve-out'
PE_entries.loc[PE_entries['majority_seller_type'].str.contains("(?i)investor",na=False), 'entry_deal_type'] = 'secondary'

PE_entries.loc[PE_entries['buyer_reasons'].str.contains("(?i)publicToPrivate",na=False), 'entry_deal_type'] = 'publicToPrivate'
```

```python
PE_entries['entry_deal_type'].value_counts(dropna = False)
```

**Case Studies**

```python
df_summary = PE_entries[PE_entries['sub_region']=='UK']
df_summary[df_summary['announcement_date_year']==2021]['entry_deal_type'].value_counts()
```

```python
PE_entries['entry_deal_type'].value_counts(dropna = False)
```

**Re-classifying primary deals where there has been previous deal activity**

Note: The thinking here is that if there's been capital in the asset once all subsequet deals would be secondary.

```python
# Step 1: Filter for investor-type deals only
investor_deals = deals[deals['buyer_types_str'].str.contains("(?i)investor", na=False)].copy()

# Step 2: Get the earliest investor-type deal per linked_asset_id
earliest_investor_deals = (
    investor_deals.sort_values(by='announcement_date')
    .groupby('linked_asset_id', as_index=False)
    .first()[['linked_asset_id', 'announcement_date']]
    .rename(columns={'announcement_date': 'earlier_investor_deal_date'})
)

# Step 3: Merge this into PE_entries
PE_entries = PE_entries.merge(earliest_investor_deals, on='linked_asset_id', how='left')

# Step 4: Vectorized update of entry_deal_type
mask = (
    (PE_entries['entry_deal_type'] == 'primary') &
    (PE_entries['earlier_investor_deal_date'].notna()) &
    (PE_entries['earlier_investor_deal_date'] < PE_entries['announcement_date'])
)

PE_entries.loc[mask, 'entry_deal_type'] = 'secondary'

PE_entries.drop(columns='earlier_investor_deal_date', inplace=True)


# Step 5: Clean up memory
del investor_deals, earliest_investor_deals, mask
gc.collect()

```

```python
PE_entries['entry_deal_type'].value_counts(dropna = False)
```

## PE Exits


**LOGIC**

- Any deal that had seller as an investor
- But you want to exclude VC Exits here
- Exclude secondary post listig transactions

```python
# Want to exit VC exits here
PE_exits = deals_novc[deals_novc['seller_types_str'].str.contains("(?i)investor",na=False)]
PE_exits[~PE_exits['buyer_reasons'].str.contains("(?i)vcRound",na=False)]
PE_exits = PE_exits[PE_exits['ownership']!='ventureCapital']
PE_exits = PE_exits[~PE_exits['funding_round_type'].str.contains("(?i)series|seed", na=False)]
```

```python
deals[deals['deal_id']==10545382].T.head(100)
```

```python
PE_exits.shape
```

**Here we are excluding secondary trasnactions from PE's post IPO sale, as they are already listed and are secondary market transactions**

If it's an IPO usually reason type is given as IPO

```python
PE_exits= PE_exits[~((PE_exits['buyer_types_str']=='[]') & (PE_exits['combined_reasons'].isna())  &(PE_exits['ownership']=='listed'))]
```

```python
PE_exits.shape
```

**Here we are checking if the previous round was VC round so it could be a VC exit and not PE exit**


<span style="color:orange"> **LATER TO DO: NOT SURE IF WE NEED COMBINED REASON HERE CAN DO BUYER REASON** </span>


```python
# Making sure we don't take VC exits in this list, so look if previous round was a VC round this exit round is most likely a VC exit, doing this across automated deals as well because all VC deals are often not curated

deals_previous_reason = deals_all_inc_automated.sort_values(by=['linked_asset_id', 'announcement_date'], ascending=[True, False])
previous_reasons = deals_previous_reason.groupby('linked_asset_id')[['combined_reasons','funding_round_type']].shift(-1)
deals_previous_reason['previous_deal_reason'] = previous_reasons['combined_reasons']
deals_previous_reason['previous_funding_round_type'] = previous_reasons['funding_round_type']

```

```python
PE_exits = pd.merge(PE_exits,deals_previous_reason[['deal_id','previous_deal_reason','previous_funding_round_type']],how = 'left', on = 'deal_id')
PE_exits
```

```python
PE_exits = PE_exits[~PE_exits['previous_deal_reason'].astype(str).str.contains("vcRound", case=False, na=False)]
PE_exits = PE_exits[~PE_exits['previous_funding_round_type'].str.contains("(?i)series|seed", na=False)]
```

```python
PE_exits.shape
```

**Classifying all deal types as unkown**

```python
PE_exits['exit_deal_type'] ='unknown'
```

```python
# Set 'exit_deal_type' to 'other' if 'buyer_types' contains 'other'
PE_exits.loc[
    PE_exits['buyer_types_str'].str.contains('other', case=False, na=False),
    'exit_deal_type'
] = 'MBOs'

# Set 'exit_deal_type' to 'uniwn' if 'buyer_types' contains 'Empty' # These usually are secondary or unkown and a lot of live deals — so not really MBOs
PE_exits.loc[
    PE_exits['buyer_types_str']=='[]',
    'exit_deal_type'
] = 'unknown'
```

```python
#Strategic exit takes precedence over sponsor to sponsor and IPO takes precedence over everything else

PE_exits.loc[PE_exits['buyer_names_str'].str.contains("(?i)investor",na=False), 'exit_deal_type'] = 'secondary'
PE_exits.loc[PE_exits['buyer_types_str'].str.contains("(?i)investor",na=False), 'exit_deal_type'] = 'secondary'
PE_exits.loc[PE_exits['buyer_types_str'].str.contains("(?i)asset",na=False), 'exit_deal_type'] = 'strategicExit'

PE_exits.loc[PE_exits['majority_buyer_type'].str.contains("(?i)investor",na=False), 'exit_deal_type'] = 'secondary'
PE_exits.loc[PE_exits['majority_buyer_type'].str.contains("(?i)asset",na=False), 'exit_deal_type'] = 'strategicExit'

PE_exits.loc[(PE_exits['combined_reasons'].str.contains('(?i)strategicExit', case=False, na=False)), 'exit_deal_type'] = 'strategicExit'
PE_exits.loc[PE_exits['combined_reasons'].str.contains('IPO', case=False, na=False), 'exit_deal_type'] = 'IPO'
```

```python
PE_exits['buyer_names']
```

```python
# Some MBOs are actually not MBOs just wrongly classified public market deals, others are also secondary deals


PE_exits = PE_exits[~((PE_exits['buyer_names_str'].str.contains("(?i)public",na=False))&(PE_exits['exit_deal_type'].str.contains("(?i)MBO",na=False)))]

# Here where the buyer type is undicslosed it's actually undiclosed
PE_exits.loc[
    (PE_exits['buyer_names_str'].str.contains("undisclosed buyer", case=False, na=False)) &
    (PE_exits['exit_deal_type'].str.contains("(?i)MBO", case=False, na=False)),
    'exit_deal_type'
] = 'unknown'


```

```python
PE_exits.shape
```

```python
PE_exits['exit_deal_type'].value_counts(dropna = False)
```

```python
PE_exits[['exit_deal_type','deal_status']].value_counts(dropna = False)
```

## PE Entries Explode

```python
PE_entries_explode = PE_entries.explode(['buyer_linked_ids','buyer_types','buyer_names','buyer_share_values','buyer_share_pcts'])
PE_entries_explode = PE_entries_explode[PE_entries_explode['buyer_types']=='investor']
PE_entries_explode = PE_entries_explode[~(PE_entries_explode['buyer_linked_ids']==0)]
PE_entries_explode['buyer_linked_ids'] = PE_entries_explode['buyer_linked_ids'].replace('', pd.NA)
PE_entries_explode['buyer_linked_ids'] = pd.to_numeric(PE_entries_explode['buyer_linked_ids'], errors='coerce').astype('Int64')
#Not sure about this one as they still might be valid entries such as live deals
PE_entries_explode = PE_entries_explode[~(PE_entries_explode['buyer_linked_ids'].isna())]
PE_entries_explode.shape
```

```python
PE_entries_explode['buyer_linked_ids']
```

**Mapping missing buyer names to investor ids**


There are missing buyer linked ids, so investor are not tagged even if the buyer name is present e.g. Goldman Sachs etc.In this code we are trying to solve for that in the exploded version. Hard to do in in the array version of the code. We have also flagged it to Tech who are fixing this. You need to do this across both entry and exit dfs.

```python
alias_to_id_override = {
    # Goldman Sachs
    "Goldman Sachs PIA": 2797,
    "Goldman Sachs - PIA": 2797,
    "Goldman Sachs - Private Equity": 2797,
    "Goldman Sachs - Growth": 2797,
    "Goldman Sachs - Buyout": 2797,
    "Goldman Sachs - Real Estate": 2797,
    "Goldman Sachs (US)": 2797,
    "GS Capital Partners": 2797,
    "GS Group": 2797,
    "Broad Street Principal Investments (Goldman Sachs)": 2797,

    # J.P. Morgan
    "J.P. Morgan Asset Management": 3085,
    "J.P. Morgan Partners": 3085,
    "JPMorgan Partners": 3085,

    # Crédit Mutuel CIC
    "Crédit Mutuel-CIC": 2001,
    "CIC Finance": 2001,
    "CM-CIC Capital Privé": 2001,
    "CM-CIC Investissement": 2001,
    "CM-CIC Capital": 2001,

    # Société Générale
    "Société Générale Asset Management Alternative Investments": 1082,
    "Société Générale Entrepreneurs": 1082,
    "Société Générale Capital Partenaires": 1082,

    # Crédit Agricole
    "Crédit Agricole - Alpes Développement": 1770,
    "Crédit Agricole Unexo": 1770,
    "Credit Agricole Assurances - Predica": 1770,
    "Crédit Agricole (FR)": 1770,
    "Credit Agricole": 1770,
    "Crédit Agricole Nord-Est Partenaires": 1770,
    "Crédit Agricole Assurances": 1770,

    # ABN AMRO
    "ABN AMRO Capital": 690,
    "ABN AMRO Sustainable Impact Fund (SIF)": 690,
    "ABN AMRO - Energy Transition Fund": 690,

    "Barclays Private Equity": 5669,

    "Macquarie Group": 284,
    
    
}

```

```python
PE_entries_explode['buyer_linked_ids'] = PE_entries_explode['buyer_linked_ids'].fillna(PE_entries_explode['buyer_names'].map(alias_to_id))
PE_entries_explode['buyer_linked_ids'] = PE_entries_explode['buyer_linked_ids'].fillna(PE_entries_explode['buyer_names'].map(alias_to_id_override))
```

```python
PE_entries_explode.rename(columns={'announcement_date': 'entry_date','buyer_linked_ids': 'investor_id'},inplace = True)
```

**Lookup buyer investor region**

This works because you are only looking at investors lookup in buyer linked ids

```python
df_summary = investors[['investor_id','investor_country_name','investor_sub_region','investor_region']].copy()

df_summary.rename(columns={
    "investor_region": "buyer_region",
    "investor_country_name": "buyer_country_name",
    "investor_sub_region": "buyer_sub_region"
}, inplace=True)

```

```python
PE_entries_explode = pd.merge(PE_entries_explode,df_summary, how = 'left',left_on = 'investor_id', right_on = 'investor_id')
```

### TO DO ADD DEALS PERCENT

**<span style="color:blue"> TODO: WE SHOULD ALSO MAP DEAL PERCENTS HERE**


```python
#df_summary = PE_entries_EU_18_24.copy()
```

```python
#df_summary['buyer_shares'] = df_summary.apply(lambda row: row['buyer_shares'][:len(row['buyer_investor_ids'])], axis=1)
#df_summary['buyer_investor_ids'] = df_summary.apply(lambda row: row['buyer_investor_ids'][:len(row['buyer_shares'])], axis=1)
```

```python
#df_summary = df_summary.explode(['buyer_investor_ids','buyer_shares'])
```

```python
# For purpose of this analysis sharedMajority acts as minority only

#df_summary.loc[df_summary['buyer_shares']=='sharedMajority','buyer_shares']='minority'
```

```python
# Count how many majority and minority owners own an investment to get ownership share

'''
deal_ownership_counts = df_summary.groupby(['deal_id']).agg(
    majority_owner_count=('buyer_shares', lambda x: (x == 'majority').sum()),
    minority_owner_count=('buyer_shares', lambda x: ((x == 'minority') | (x == 'sharedMajority')).sum())
) '''
```

```python
#df_summary = pd.merge(df_summary, deal_ownership_counts, left_on = ['deal_id'], right_on = ['deal_id'], how='left')
```

```python
# Look up ownership percentage from deal_pct_mapping

#df_summary = pd.merge(df_summary, deal_pct_mapping, left_on = ['majority_owner_count','minority_owner_count'], right_on = ['majority_owner_count','minority_owner_count'], how='left')

```

```python
# Assign ownership percent whether the deal buyer took a minority share or a majority share

#df_summary['ownership_pct'] = np.where(df_summary['buyer_shares'] == 'majority', df_summary['majority_pct'],df_summary['minority_pct'])


```

```python
#normalize the ownership share

#sum_pct = df_summary.groupby('deal_id')['ownership_pct'].transform('sum')

#df_summary['normalized_ownership_pct'] = df_summary['ownership_pct'] / sum_pct

```

```python
#creating dataframe of PE entries which has investor details

# Step 2: Merge with investors DataFrame

'''
merged_df = df_summary.merge(
    investors[['investor_id', 'investor_sub_region', 'investor_country_name']],
    left_on='buyer_investor_ids',
    right_on='investor_id',
    how='left'
)'''
```

### Creating Majority and Minority PE Entries


```python
PE_entries.shape
```

```python
PE_entries[PE_entries['buyer_share_values_str']=='[""]']['seller_share_values_str'].value_counts()
```

```python
PE_entries[PE_entries['buyer_share_values_str']=='[""]']
```

```python
PE_entries_majority = PE_entries.loc[
    PE_entries['buyer_share_values_str'].str.contains("(?i)majority", na=False)]
PE_entries_majority.shape
```

```python
PE_entries_minority = PE_entries.loc[~PE_entries['buyer_share_values_str'].str.contains("(?i)majority", na=False)]
print(PE_entries_minority.shape)
#PE_entries_minority = PE_entries_minority.loc[PE_entries_minority['buyer_share_values_str'].str.contains("(?i)minority", na=False)]
#print(PE_entries_minority.shape)
```

## PE Exits Explode

```python
PE_exits_explode = PE_exits.explode(['seller_linked_ids','seller_types','seller_names','seller_share_values','seller_share_pcts'])
PE_exits_explode = PE_exits_explode[PE_exits_explode['seller_types']=='investor']
PE_exits_explode['seller_linked_ids'] = PE_exits_explode['seller_linked_ids'].replace('', pd.NA)
PE_exits_explode = PE_exits_explode[~(PE_exits_explode['seller_linked_ids']==0)]
PE_exits_explode.shape
```

**Looking up missing seller linked ids based on seller names**

```python
PE_exits_explode['seller_linked_ids'] = PE_exits_explode['seller_linked_ids'].fillna(PE_exits_explode['seller_names'].map(alias_to_id))
PE_exits_explode['seller_linked_ids'] = PE_exits_explode['seller_linked_ids'].fillna(PE_exits_explode['seller_names'].map(alias_to_id_override))

PE_exits_explode['seller_linked_ids'] = pd.to_numeric(PE_exits_explode['seller_linked_ids'], errors='coerce').astype('Int64')
```

```python
#Still some missing actually
PE_exits_explode[PE_exits_explode['seller_linked_ids'].isna()][['seller_linked_ids','seller_names']].value_counts(dropna = False)
```

```python
#Not sure about this one to be honest as there are sometimes no sellers but it could still be a valid PE exit

PE_exits_explode = PE_exits_explode[~(PE_exits_explode['seller_linked_ids'].isna())]
```

**Map the country of the seller**





```python
PE_exits_explode.rename(columns={'announcement_date': 'exit_date','seller_linked_ids': 'investor_id'},inplace = True)
```

```python
df_summary = investors[['investor_id','investor_country_name','investor_sub_region','investor_region']].copy()

df_summary.rename(columns={
    "investor_region": "seller_region",
    "investor_country_name": "seller_country_name",
    "investor_sub_region": "seller_sub_region"
}, inplace=True)

```

```python
PE_exits_explode = pd.merge(PE_exits_explode,df_summary, how = 'left',left_on = 'investor_id', right_on = 'investor_id')

```

## PE Add-ons


PE add-ons by current PE owned assets. Another thing with Add-ons is that a EU owned asset could have global add-ons so apllying regional filter is not the right way to do things

```python
assets['ownership'].value_counts()
```

```python
PE_assets = assets[assets['ownership'].isin(['regular','minority'])]
```

```python
#Here we are considering global add-ons so Europe firms even buying international but just owned by current PE assets, we are also considering add-ons here for assets that were bought before they came into PE acquisition but this would be a low number

PE_assets['asset_id'] = PE_assets['asset_id'].astype(str)

all_ids = set(PE_assets['asset_id'])

PE_add_ons = deals[
    deals['buyer_asset_ids'].apply(
        lambda x: isinstance(x, list) and any(item in all_ids for item in x)
    )
]

PE_add_ons.head(5)
```

```python
PE_add_ons.shape
```

**Only take majority investments, minority investments are not neeeded or VC rounds, these are typically not acquisitions, e.g. Open AI with Microsoft or Claude with Amazon etc.**

```python
PE_add_ons = PE_add_ons[
    PE_add_ons['buyer_share_values'].apply(
        lambda x: any(i in ['majority', 'sharedMajority'] for i in x) if isinstance(x, list) else False
    ) &
    (~PE_add_ons['buyer_reasons'].str.contains("(?i)vcRound", na=False))
]

PE_add_ons
```

### Mapping Historical addons of PE owned companies that might have exited

```python
#Not sure here if we should take the min appraoch — now we're taking the approach that every entry and exit is a holding period, maybe for add-ons works

PE_entry_date_add_ons = PE_entries_explode.groupby(
    ['linked_asset_id', 'investor_id', 'ownership', 'sector'], dropna=False
).agg(entry_date=('entry_date', 'min')).reset_index()

    
#There are historical entries that don't have a linked id so that means it's going to be hard to tell their add-on entries as well
PE_entry_date_add_ons = PE_entry_date_add_ons[PE_entry_date_add_ons['linked_asset_id'].notna()]
PE_entry_date_add_ons = PE_entry_date_add_ons[PE_entry_date_add_ons['investor_id'].notna()]

PE_entry_date_add_ons['investor_id'] = pd.to_numeric(PE_entry_date_add_ons['investor_id'], errors='coerce').astype('Int64')
PE_entry_date_add_ons['linked_asset_id'] = pd.to_numeric(PE_entry_date_add_ons['linked_asset_id'], errors='coerce').astype('Int64')


PE_entry_date_add_ons

```

```python
PE_exit_date_add_ons = PE_exits_explode.groupby(['linked_asset_id','investor_id'],dropna = False).agg(exit_date = ('exit_date','max'))
PE_exit_date_add_ons = PE_exit_date_add_ons.reset_index()

PE_exit_date_add_ons = PE_exit_date_add_ons[PE_exit_date_add_ons['linked_asset_id'].notna()]
PE_exit_date_add_ons = PE_exit_date_add_ons[PE_exit_date_add_ons['investor_id'].notna()]

PE_exit_date_add_ons['investor_id'] = pd.to_numeric(PE_exit_date_add_ons['investor_id'], errors='coerce').astype('Int64')
PE_exit_date_add_ons['linked_asset_id'] = pd.to_numeric(PE_exit_date_add_ons['linked_asset_id'], errors='coerce').astype('Int64')


```

```python
PE_exit_date_add_ons[PE_exit_date_add_ons['linked_asset_id']==5]
```

```python
PE_entry_exit_add_ons = pd.merge(PE_entry_date_add_ons,PE_exit_date_add_ons,how = 'left',left_on = ['linked_asset_id','investor_id'],right_on = ['linked_asset_id','investor_id']).reset_index()
PE_entry_exit_add_ons.rename(columns={'linked_asset_id': 'asset_id'},inplace = True)
```

```python
PE_entry_exit_add_ons[PE_entry_exit_add_ons['asset_id']==1][['entry_date','exit_date']]
```

```python
'''PE_entry_exit_majority = pd.merge(PE_entry_date_majority,PE_exit_date,how = 'left',left_on = ['linked_asset_id','investor_id'],right_on = ['linked_asset_id','investor_id']).reset_index()
PE_entry_exit_majority.rename(columns={'linked_asset_id': 'asset_id'},inplace = True)'''
```

```python
assets['ownership'].value_counts()
```

```python
PE_entry_date_add_ons['ownership'].value_counts(dropna = False)
```

```python
#PE_entry_date_majority['ownership'].value_counts()
```

```python
PE_entry_exit_add_ons[(PE_entry_exit_add_ons['exit_date'].isna())]['ownership'].value_counts()
```

```python
# Strip trailing ".0" and cast to string
PE_entry_exit_add_ons['asset_id'] = PE_entry_exit_add_ons['asset_id'].astype('Int64').astype(str)
PE_assets['asset_id'] = PE_assets['asset_id'].astype(str)
```

```python
PE_entry_exit_add_ons.shape
```

```python
PE_entry_exit_historical_not_pe = PE_entry_exit_add_ons[(PE_entry_exit_add_ons['exit_date'].notna()) & (-PE_entry_exit_add_ons['asset_id'].isin(PE_assets['asset_id']))]
PE_entry_exit_historical_not_pe
```

```python
PE_entry_exit_historical_not_pe['ownership'].value_counts()
```

```python
deals['buyer_reasons']
```

```python
# Step 1: Keep only rows with buyer_share_values including majority/sharedMajority
# Step 2: Ensure buyer_types include 'asset' even when comma-separated
# Step 3: Exclude reasons containing 'vcRound' (case-insensitive)
deals_asset_majority = deals[
    deals['buyer_share_values'].apply(
        lambda x: isinstance(x, list) and any(i.lower() in ['majority', 'sharedmajority'] for i in x)
    ) &
    deals['buyer_types_str'].str.contains(r'\basset\b', case=False, na=False) &
    ~deals['buyer_reasons'].str.contains(r'vcRound', case=False, na=False)
]


# Step 4: Explode buyer_asset_ids (assumes it is a list or comma-separated field)
deals_asset_majority = deals_asset_majority.explode('buyer_asset_ids')
deals_asset_majority
```

```python
#exclude current PE assets
PE_entry_exit_addons = pd.merge(PE_entry_exit_historical_not_pe,deals_asset_majority, left_on = 'asset_id', right_on = 'buyer_asset_ids', how = 'left')
PE_entry_exit_addons = PE_entry_exit_addons[(PE_entry_exit_addons['announcement_date']>= PE_entry_exit_addons['entry_date']) & 
                                                 (PE_entry_exit_addons['announcement_date']<= PE_entry_exit_addons['exit_date'])]
PE_entry_exit_addons
```

```python
PE_historical_addon_ids = PE_entry_exit_addons['deal_id'].unique()
PE_historical_addons = deals[deals['deal_id'].isin(PE_historical_addon_ids)]
PE_historical_addons
```

### Final Add-on Dataset

```python
#Append Historical Add-ons

PE_add_ons = pd.concat([PE_add_ons,PE_historical_addons], ignore_index=True)
PE_add_ons = PE_add_ons[PE_add_ons['majority_buyer_type']=='asset']
PE_add_ons
```

```python
PE_add_ons['majority_buyer_linked_id']
```

```python
assets_automated
```

```python
df_summary = assets_automated[['asset_id','country_name','sub_region','region','subsector','sector']]

df_summary = df_summary.rename(columns={"country_name":"buyer_country_name",
                                       "sub_region":"buyer_sub_region",
                                       "region":"buyer_region",
                                       "subsector":"buyer_subsector",
                                       "sector":"buyer_sector",})

```

```python
PE_add_ons = pd.merge(
    PE_add_ons,
    df_summary,
    left_on='majority_buyer_linked_id',
    right_on='asset_id', 
    how = 'left')

PE_entries.drop(columns='asset_id', inplace=True)


```

```python
PE_add_ons_EU = PE_add_ons[PE_add_ons['buyer_region']=='Europe']
```

## Creating combined PE deals datasets

```python
PE_combined_entries_exits = pd.concat([PE_entries,PE_exits],ignore_index = True)
PE_combined_entries_exits = PE_combined_entries_exits.drop_duplicates(subset='deal_id')


PE_combined_entries_exits_add_ons = pd.concat([PE_entries,PE_exits,PE_add_ons],ignore_index = True)
PE_combined_entries_exits_add_ons = PE_combined_entries_exits_add_ons.drop_duplicates(subset='deal_id')
```

## Holding Period


**<span style="color:blue"> TODO: A LOT OF DUPLICATES HERE**


```python editable=true slideshow={"slide_type": ""}
PE_entry_exit = pd.merge(
    PE_entries_explode,
    PE_exits_explode,
    on=['linked_asset_id', 'investor_id'],
    suffixes=('_entry', '_exit'),
    how = 'left'
).sort_values(by=['linked_asset_id', 'investor_id'])
len(PE_entry_exit)
```

```python
PE_entry_exit['entry_date'] = pd.to_datetime(PE_entry_exit['entry_date'], format='%Y-%m', errors='coerce')
PE_entry_exit['exit_date'] = pd.to_datetime(PE_entry_exit['exit_date'], format='%Y-%m', errors='coerce')


PE_entry_exit['exit_year'] = PE_entry_exit['exit_date'].dt.year
PE_entry_exit['entry_year'] = PE_entry_exit['entry_date'].dt.year

```

```python

PE_entry_exit['holding_period_years'] = (PE_entry_exit['exit_date'] - PE_entry_exit['entry_date']).dt.days/365
PE_entry_exit['holding_period_years'] = (PE_entry_exit['exit_date'] - PE_entry_exit['entry_date']).dt.days/365
PE_entry_exit['holding_period_months'] = (PE_entry_exit['exit_date'] - PE_entry_exit['entry_date']) / pd.Timedelta(days=30)

```

```python
# We get rid of NaN asset ids -> these holdings do not make sense as the logic is to combine entries and exits
# based on the same linked_asset_id so random deals without asset ID get combined
PE_entry_exit.dropna(subset='linked_asset_id', inplace=True)
len(PE_entry_exit)
```

```python
PE_entry_exit = PE_entry_exit[-(PE_entry_exit['holding_period_years']<=0)]
len(PE_entry_exit)
```

```python
PE_entry_exit = pd.merge(PE_entry_exit ,assets[['asset_id','name','sub_region','region', 'country_code', 'ownership','owner_names','owner_ids']], left_on = 'linked_asset_id', right_on = 'asset_id', how = 'left')
```

**Creating unsold investors dataabase**

```python
PE_entry_exit_unsold=PE_entry_exit.copy()

#Delete entries where there is clearly an exit but we haven't tracked the exit clearly, if there is no investor owner that means it's been sold

PE_entry_exit_unsold = PE_entry_exit_unsold[-((PE_entry_exit_unsold['exit_year'].isna()) & (PE_entry_exit_unsold['owner_ids'].isna()))]

print(PE_entry_exit_unsold.shape)

#This step is done to remove assets that might have not had a exit deal clearly marked. So check if the investor id is still in a current owner to make sure it's unsold 

mask = PE_entry_exit_unsold.apply(
    lambda r: str(r['investor_id']) in {str(x) for x in (r['owner_ids'] if isinstance(r['owner_ids'], list) else [])},
    axis=1)

PE_entry_exit_unsold = PE_entry_exit_unsold[ (PE_entry_exit_unsold['exit_year'].notna()) | (mask & PE_entry_exit_unsold['exit_year'].isna()) ]


print(PE_entry_exit_unsold.shape)

#We are creating this as we would be removing duplicates dealid and investor id pairs.. as we don't one 1 deal with 10 minority investors to be there 10 times but just 1 time
PE_entry_exit_unsold_investor = PE_entry_exit_unsold.copy()

PE_entry_exit_unsold = PE_entry_exit_unsold.drop_duplicates(subset=['deal_id_entry', 'deal_id_exit'])

print(PE_entry_exit_unsold.shape)

```

```python
PE_entry_exit.shape
```

```python
PE_entry_exit = PE_entry_exit[PE_entry_exit['exit_date'] > PE_entry_exit['entry_date']].copy()
print(PE_entry_exit.shape)
PE_entry_exit = PE_entry_exit[PE_entry_exit['exit_date'].notna()]
print(PE_entry_exit.shape)
```

```python
PE_entry_exit['holding_period_years'].describe()
```

```python
# Not sure about this one to be honest

PE_entry_exit = PE_entry_exit[~(PE_entry_exit['holding_period_years']>15)]
```

```python

#Need this dataset for investor level analysis
PE_entry_exit_investor = PE_entry_exit.copy()


#We are creating this as we would be removing duplicates dealid and investor id pairs.. as we don't one 1 deal with 10 minority investors to be there 10 times but just 1 time

PE_entry_exit = PE_entry_exit.drop_duplicates(subset=['deal_id_entry', 'deal_id_exit'])
```

**<span style="color:blue"> TODO: CREATE A MAJORITY ONE**


```python
# Use another code to create majority here

#deals_entry_exit_holding_majority = PE_entry_exit_majority[PE_entry_exit_majority['exit_date'].notna()]
#deals_entry_exit_holding_majority
```

# INVESTOR RANKING


### Entry and exit count

Last 6 years of data to filter only for active investors later

```python
# Creating datasets to count entries for the last 6 years

entries_count_explode = PE_entries_explode[PE_entries_explode['announcement_date_year']>=(current_year-6)]
exits_count_explode = PE_exits_explode[PE_exits_explode['announcement_date_year']>=(current_year-6)]
```

```python
entries_count = entries_count_explode.groupby(['investor_id','region','sub_region','country_name','sector'],dropna=False)[['asset']].nunique()
entries_count = entries_count.rename(columns={"asset": "entries_count"})

exits_count = exits_count_explode.groupby(['investor_id','region','sub_region','country_name','sector'],dropna=False)[['asset']].nunique()
exits_count = exits_count.rename(columns={"asset": "exits_count"})

entries_exits_count = pd.concat(
    [entries_count, exits_count],axis =1)

entries_exits_count = entries_exits_count.reset_index()
```

```python
# Rolling up the values to get a good summary table

entries_exits_count_sector = entries_exits_count.groupby(['investor_id','sector'])[["entries_count", "exits_count"]].sum().reset_index()
entries_exits_count_region =  entries_exits_count.groupby(['investor_id','region'])[["entries_count", "exits_count"]].sum().reset_index()
entries_exits_count_sub_region =  entries_exits_count.groupby(['investor_id','sub_region'])[["entries_count", "exits_count"]].sum().reset_index()
entries_exits_count_country =  entries_exits_count.groupby(['investor_id','country_name'])[["entries_count", "exits_count"]].sum().reset_index()
```

```python
entries_exits_count_sector
```

```python
entries_exits_count_US = entries_exits_count_sub_region[entries_exits_count_sub_region['sub_region']=='US'].reset_index(drop = True)
entries_exits_count_EU = entries_exits_count_region[entries_exits_count_region['region']=='Europe'].reset_index(drop = True)
```

### One Off Cleaning


**<span style="color:blue"> TODO: Follow-up with Vincent Miko Basil on this to fix Platinum Equity**



**Platinum Equity Correct number of entries**

```python
entries_exits_count.loc[entries_exits_count['investor_id'] == 13401, 'entries_count'] = 9
```

```python
#replicator(PE_entries[['deal_id','buyer_names_str','buyer_linked_ids']])
```

**Reclassify sector of Mileaway**

```python
assets.loc[assets['asset_id']==10982, 'sector'] = 'industrials'
assets.loc[assets['asset_id'] == 10982, 'subsector'] = 'logistics'
```

**Headquarters Change for a few investors**

**<span style="color:blue"> TODO: Samyam Checking**


```python
investors.loc[investors['investor_id'] == 1134, 'operational_hq_country_code'] = 'GB'
investors.loc[investors['investor_id'] == 8650, 'operational_hq_country_code'] = 'SE'
investors.loc[investors['investor_id'] == 2364, 'operational_hq_country_code'] = 'SE'
investors.loc[investors['investor_id'] == 8922, 'operational_hq_country_code'] = 'LU'
investors.loc[investors['investor_id'] == 8137, 'operational_hq_country_code'] = 'PL'
investors.loc[investors['investor_id'] == 265, 'operational_hq_country_code'] = 'SE'
```

**Renaming investor names**

```python
# Update investor_name where investor_id is 4736
investors.loc[investors['investor_id'] == 3269, 'investor_name'] = 'CDC France'
```

### Investors Explode

Steps: 

1. Explode investors data so you have investor level holding
2. Merge with assets data to get asset financials

```python
## Explode investors table to individual shareholding

investors_explode = investors[['investor_id','investor_name','investor_hq_city','investor_country_name',
                               'investor_region','investor_sub_region','funds_raised_last_five_years_eur','asset_id']
                             ].explode('asset_id')
```

```python
investors_explode['asset_id'] = pd.to_numeric(investors_explode['asset_id'], errors='coerce').astype('Int64') 
investors_explode['asset_id'] = investors_explode['asset_id'].fillna(-1).astype(int)
```

**Merging the Asset Dataset:**

We are merging the asset dataset to get underlying portfolio trends such as growth rates or EBITDA margins and add on count at the portfolio level.

Note: We are taking some automated datasets here but not all VC-backed assets fully in terms of count. The issue is for PEI 300 all assets should be well curated can see later in assets_all_automated.

At the moment automated assets are not high quality. And sometimes they could be PE Minority or Majority as well or private so they need to be curated.

**<span style="color:orange"> FOR LATER: INCLUDE AUTOMATED VC-BACKED ASSETS FOR ANALYSIS**


```python
#CODE TO TEST FOR AUTOMATED ASSETS

df_summary = assets_automated[['asset_id','name','region','ownership']]
df_summary = df_summary.rename(columns={"name": "asset_automated_name","region": "asset_automated_region","ownership": "asset_automated_ownership"  })
investors_explode_test = pd.merge(investors_explode, df_summary, left_on = ['asset_id'], right_on = ['asset_id'], how='left')

```

```python
#Export automated assets with profile type automated

#replicator(investors_explode_test[investors_explode_test['profile_type']=='automated'])
```

```python
#Export automated assets with profile type is also automated but is not in the original assets table


#replicator(investors_explode_test[investors_explode_test['profile_type'].isna()])
```

```python
#replicator(investors_explode_test[investors_explode_test['ownership'].isna()])
```

**<span style="color:blue"> TODO: ASK ASSETS TO BE CURATED THAT ARE NOT CURATED AND PEI 300**


```python
assets_explode = assets.explode(['owner_ids','owner_shares','owner_names'])
assets_explode = assets_explode.rename(columns={"name": "asset_name"})
assets_explode['owner_ids'] = pd.to_numeric(assets_explode['owner_ids'], errors='coerce').astype('Int64') 
assets_explode['owner_ids'] = assets_explode['owner_ids'].fillna(-1).astype(int)
```

```python
investors_explode = pd.merge(investors_explode, assets_explode, left_on = ['investor_id','asset_id'], right_on = ['owner_ids','asset_id'], how='left')
```

### Ranking Methodology Note 

<!-- #region -->
The ranking methodology is based on EV at the asset level and we sum this bottoms up to get the investor EV. 

For Europe: Where we have EV that is reported by a deal that happened in the last 2 years so 2023 and 2024 we use this as a basis to calculate the Asset EV. All the other times we estimate the EV based on the below formula below


Estimated EV == Last reported EBITDA * ownership share * predicted EXIT multiple

Ownership share:  If there are 1 majority owned 10 minority owners we divide their ownership in a way that is representative. Owner shares tell if that asset by an investor is owned as majority or minority

Estimating EBITDA: Last Reported EBITDA coverage is good in Europe but at time there are missing values. Here is how we impute it: 

- Option 1: where revenue is available assume terminal subsector EBITDA margin and based on that impute the EBITDA

- Option 2: I think we should move this to revenue/FTE appraoch... Impute based on the investors other EBITDAs (atleast 3 values should be there for majority and minority seperate imputation and cap at 0.5m * FTE)

CHECK: If we are using 0.5m

For USA: Use last 6 years of deal reported EVs as the metric coverage for EBITDAs etc. is quite bad

<!-- #endregion -->

**<span style="color:blue"> TODO: UPDATE OWNERSHIP SHARE TO GIVE 90% share for majority ownership with single holding as well**



### Fill ownership pct

```python
# Count how many majority and minority owners own an investment to get ownership share and merge it back

investor_ownership_counts = investors_explode.groupby(['asset_id']).agg(
    majority_owner_count=('owner_shares', lambda x: (x == 'majority').sum()),
    minority_owner_count=('owner_shares', lambda x: (x == 'minority').sum())
)

investors_explode = pd.merge(investors_explode, investor_ownership_counts, left_on = ['asset_id'], right_on = ['asset_id'], how='left')
```

```python
# Look up the percentage that you need to assign for majority and minority holdings

investors_explode = pd.merge(investors_explode, owner_pct_mapping, left_on = ['ownership','majority_owner_count','minority_owner_count'], right_on = ['ownership','majority_owner_count','minority_owner_count'], how='left')

#Assign values based on whether the asset is majority or minority owned

investors_explode['ownership_pct'] = np.where(investors_explode['owner_shares'] == 'majority', investors_explode['majority_pct'],investors_explode['minority_pct'])

#Fill values where because of some errors the vaues is not there

investors_explode['ownership_pct'] = investors_explode['ownership_pct'].fillna(
    0.9 / investors_explode['count_owners'])


```

**Merging actual deal share**

Where we have actual values using them instead of estimated values. Also using the last value where the data is available.

```python
deal_pcts = deals.copy()

deal_pcts=deals.explode(['buyer_linked_ids','buyer_share_pcts','buyer_types'])[['linked_asset_id','announcement_date','buyer_linked_ids','buyer_share_pcts','buyer_types']]

deal_pcts = deal_pcts[deal_pcts['buyer_types']=='investor']


deal_pcts['buyer_share_pcts'] = pd.to_numeric(deal_pcts['buyer_share_pcts'], errors='coerce')

deal_pcts = deal_pcts[deal_pcts['buyer_share_pcts'].notna()]

deal_pcts = deal_pcts.sort_values(by=['announcement_date','buyer_share_pcts'], ascending= [False, False])


deal_pcts = (
    deal_pcts
    .groupby(['linked_asset_id', 'buyer_linked_ids'], dropna=False)
    .agg({
        'buyer_share_pcts': lambda x: [f"{v*100:.0f}%" for v in x]  # convert to %
    })
    .reset_index()
)



#deal_pcts.drop(columns=['announcement_date'], inplace=True)

deal_pcts['buyer_linked_ids'] = pd.to_numeric(deal_pcts['buyer_linked_ids'], errors='coerce').astype('Int64') 


deal_pcts
```

```python
#Merge actual deal pcts with investors explode to cross check data

investors_explode = pd.merge(investors_explode,deal_pcts, how = 'left', left_on = ['investor_id','asset_id'], right_on = ['buyer_linked_ids','linked_asset_id'])
investors_explode.drop(columns=['linked_asset_id','buyer_linked_ids'], inplace=True)
```

### Family office cleaning

These are holding companies and we don't the biggest asset of the holding to be there — just secondary assets 

- Lego Group by KIRKBI 448 
- SHV Energy by SHV 694
- Tencent with Supercell
- Heartland with BESTSELLER
- Exclude second profile for idiCo

```python
investors_explode = investors_explode[investors_explode['asset_id'] != 685042]
investors_explode = investors_explode[investors_explode['asset_id'] != 4071]
investors_explode = investors_explode[investors_explode['asset_id'] != 792131]
investors_explode = investors_explode[investors_explode['asset_id'] != 1460297]
investors_explode = investors_explode[investors_explode['asset_id'] != 3180]
```

### Creating Regional Investor Explode

```python
# Include only PE ownership assets in Europe for the ranking

investors_mm_europe = investors_explode[
    (investors_explode['ownership'].isin(['regular','minority']) ) &
    (investors_explode['region']=='Europe')]

investors_mm_europe = investors_mm_europe.copy()
investors_mm_europe['majority'] = (investors_mm_europe['owner_shares'] == 'majority').astype(int)
```

```python
# Include only PE ownership assets in US for the ranking

investors_mm_us = investors_explode[
    (investors_explode['ownership'].isin(['regular','minority']) ) &
    (investors_explode['country_code']=='US')]


investors_mm_us = investors_mm_us.copy() 
investors_mm_us['majority'] = (investors_mm_us['owner_shares'] == 'majority').astype(int)
```

```python
# Include only PE ownership assets in NA for the ranking

investors_mm_na = investors_explode[
    (investors_explode['ownership'].isin(['regular','minority']) ) &
    (investors_explode['region']=='North America')]

investors_mm_na = investors_mm_na.copy() 
investors_mm_na['majority'] = (investors_mm_na['owner_shares'] == 'majority').astype(int)
```

```python
investors_vc_europe = investors_explode[
    (investors_explode['ownership'].isin(['ventureCapital'])) &
    (investors_explode['region']=='Europe')]
```

**Getting Median Metrics**


```python
investor_dfs_explode = [investors_mm_europe, investors_mm_us, investors_mm_na]

#Q: do we need this fill na terminology — it's a bit complex...

# Get median EBTIDA at an investor level

for df in investor_dfs_explode:
    df['median_ebitda_pos'] = df.groupby('investor_id')['ebitda_eur_pos'].transform('median')
    df['ebitda_eur_pos_fill_na']=df['ebitda_eur_pos']
    df['predicted_exit_multiple_fill_na']=df['predicted_exit_multiple']
    df['revenue_eur_fill_na']=df['revenue_eur']
    
```

```python
# Maybe we don't need it by country as US not as much data anyway so can do a bit more global here for now
# Think about EV to Sales methodology and take maybe for software assets which is an increasing 

subsector_margin = assets_EU_PE.groupby('subsector')['ebitda_pct_revenue'].median()
subsector_multiple = assets_EU_PE.groupby('subsector')['predicted_exit_multiple'].mean()
```

```python
# Testing if we can seperately take US subsector data and tht answer seems to be no as the margins are a lot lower in the US generally particularly in Software so the results might be understated or not enough data points so fine to take European subsector average for now

# Very small assets in ths US tend to have negative margin and that is expected maybe move towards a more EV to sales approach

df_summary = (
    assets
    .groupby(['ownership', 'subsector', 'region'])
    .agg(
        median_ebitda_pct_revenue=('ebitda_pct_revenue', 'median'),
        count=('ebitda_pct_revenue', 'count')
    )
    .reset_index()
)

replicator(df_summary)

```

```python
# Testing data for accurarcy

replicator(assets[assets['ownership']=='listed'][['asset_id','name','ebitda_pct_revenue','region','subsector']])
```

**<span style="color:blue"> TODO: NEED TO MAKE THIS CODE A BIT MORE MODULAR FOR THE REGIONS SUCH AS US RANKING**


<!-- #region -->

**<span style="color:blue"> TODO: THINK ABOUT EV TO SALES FOR SOFTWARE ASSETS**

-  Think about EV to Sales methodology and take maybe for software assets which is an increasing 



**<span style="color:blue"> TODO: USE AI EBITDA ESTIMATES AHEAD OF THIS FILLING BY TERMINAL MARGIN**

<!-- #endregion -->

### Fill EBITDA for Europe

Steps to fill EBITDA

1. Fill AI Generated EBITDA
2. Fill revenue (incl.) AI Generated (higher priority) and estimated based on Revenue/FTE * Subsector Margin
3. Fill based on investors other holdings




**Check fill rates for AI generated values in Europe and US**

```python
#Checking fill rates for revenue and ebitda normal and ai generated in Europe

print(investors_mm_europe[['revenue_with_ai_generated']].notna().value_counts(normalize = True))
print("\n")
print(investors_mm_europe[['ebitda_with_ai_generated']].notna().value_counts(normalize = True))
print("\n")
print(investors_mm_europe[['revenue_with_ai_generated','ebitda_with_ai_generated']].notna().value_counts(normalize = True))

```

```python
#Checking fill rates for revenue and ebitda normal and ai generated in US

print(investors_mm_us[['revenue_with_ai_generated']].notna().value_counts(normalize = True))
print("\n")
print(investors_mm_us[['ebitda_with_ai_generated']].notna().value_counts(normalize = True))
print("\n")
print(investors_mm_us[['revenue_with_ai_generated','ebitda_with_ai_generated']].notna().value_counts(normalize = True))

```

**Fill NA values based on AI EBITDAs and Revenue values**

```python
# STEPS TO FILL EBITDAs where value is not available

# 1st — Fill using AI EBITDA Estimates

# 2nd — Fill using AI Revenue * Subsector Margin

# 3rd — Fill using Est. Revenue (Revenue/FTE approach) * Subsector Margin


mask = (
    (investors_mm_europe['ebitda_eur'].isna()) &
    (investors_mm_europe['ebitda_with_ai_generated_eur'].notna()) & (investors_mm_europe['ebitda_with_ai_generated_eur']>0)
)

investors_mm_europe.loc[mask,'ebitda_eur_pos_fill_na'] = investors_mm_europe['ebitda_with_ai_generated_eur']


# First fill by AI revenue where the data is available, if not then use revenue to FTE approach

# Fill revenue eur based on AI estimates

mask = (
    (investors_mm_europe['revenue_eur'].isna()) &
    (investors_mm_europe['revenue_with_ai_generated_eur'].notna())
)

investors_mm_europe.loc[mask,'revenue_eur_fill_na'] = investors_mm_europe['revenue_with_ai_generated_eur']

# Fill revenue eur based on calculated FTE estimates based on FTE Range

mask = (
    (investors_mm_europe['revenue_eur_fill_na'].isna()) &
    (investors_mm_europe['estimated_revenues_calc_eur'].notna())
)

investors_mm_europe.loc[mask,'revenue_eur_fill_na'] = investors_mm_europe['estimated_revenues_calc_eur']

# Estimate EBITDA based on terminal margin where revenue is present

investors_mm_europe['subsector_margin'] = investors_mm_europe['subsector'].map(subsector_margin)/100

mask = (
    (investors_mm_europe['ebitda_eur_pos_fill_na'].isna()) &
    (investors_mm_europe['revenue_eur_fill_na'].notna())
)

investors_mm_europe.loc[mask,'ebitda_eur_pos_fill_na'] = investors_mm_europe['revenue_eur_fill_na'] * investors_mm_europe['subsector_margin']


```

```python
# Fill Multiple where it's missing

investors_mm_europe['subsector_multiple'] = investors_mm_europe['subsector'].map(subsector_multiple)

investors_mm_europe.loc[investors_mm_europe['predicted_exit_multiple'].isna(),'predicted_exit_multiple_fill_na'] = investors_mm_europe['subsector_multiple']

```

```python
# Now where we don't have both revenue and EBITDA fill based on the 10th percentile of assets other holding (these assets tend to be small anyway because they don't have any reporting)

def fill_missing_ebitda(df):
    percentile_10th_ebitda = df.groupby(['investor_id'])['ebitda_eur_pos_fill_na'].transform(lambda x: x.quantile(0.1))
    df['ebitda_eur_pos_fill_na'] = df['ebitda_eur_pos_fill_na'].fillna(percentile_10th_ebitda)
    return df

investors_mm_europe = fill_missing_ebitda(investors_mm_europe)

```

```python

# Exit Multiple Missing Fill
def fill_missing_multiple(df):

    mean_multiple = df.groupby(['investor_id'])['predicted_exit_multiple_fill_na'].transform('mean')
    df['predicted_exit_multiple_fill_na'] = df['predicted_exit_multiple_fill_na'].fillna(mean_multiple)
    return df

investors_mm_europe = fill_missing_multiple(investors_mm_europe)
```

### Last Reported Deal EV

```python
#Estimating EV based on last reported deal value if it was reported in 2023 or 2024 (i.e. recently)
#merge last deal data


# Search for last reported deal values
deals_ev = deals.sort_values(by='announcement_date',ascending = False).drop_duplicates(subset='linked_asset_id', keep='first')

deals_ev = deals_ev.rename(columns={
    'ev_eur': 'ev_eur_last_deal',
    'ev_year': 'ev_year_last_deal',
    'equity_eur': 'equity_eur_last_deal',
    'equity_year': 'equity_year_last_deal',
    'ebitda_eur': 'ebitda_eur_last_deal',
    'ebitda_year': 'ebitda_year_last_deal',
    'revenue_eur': 'revenue_eur_last_deal',
    'revenue_year': 'revenue_year_last_deal',
    'ev_ebitda_multiple':'ev_ebitda_multiple_last_deal' })


# Add extra historical deal columns before the last reported date


deals_ev_array = (
    deals.sort_values(by="announcement_date", ascending = False)
    .groupby("linked_asset_id")
    .agg(
        deals_ev_eur_array=("ev_eur", lambda x: [round(v, 1) for v in x]),
        deals_ev_eur_max=("ev_eur", lambda x: round(x.max(), 1)),
        deals_ev_ebitda_max=("ev_ebitda_multiple", lambda x: round(x.max(), 1)),
        deals_ev_years_array=("ev_year", lambda x: [round(v, 0) for v in x]),
        deals_equity_eur_array=("equity_eur", lambda x: [round(v, 1) for v in x]),
        deals_equity_eur_max=("equity_eur", lambda x: round(x.max(), 1)))
    .reset_index()
)


# Add the max date separately

# For EV
ev_max_idx = (
    deals.dropna(subset=['ev_eur'])
         .groupby('linked_asset_id')['ev_eur']
         .idxmax()
)

ev_max_dates = deals.loc[ev_max_idx, ['linked_asset_id', 'announcement_date']]
ev_max_dates = ev_max_dates.rename(columns={'announcement_date': 'deals_ev_eur_max_date'})

# For Equity
equity_max_idx = (
    deals.dropna(subset=['equity_eur'])
         .groupby('linked_asset_id')['equity_eur']
         .idxmax()
)

equity_max_dates = deals.loc[equity_max_idx, ['linked_asset_id', 'announcement_date']]
equity_max_dates = equity_max_dates.rename(columns={'announcement_date': 'deals_equity_eur_max_date'})

# Merge back into deals_ev_array
deals_ev_array = (
    deals_ev_array
    .merge(ev_max_dates, on='linked_asset_id', how='left')
    .merge(equity_max_dates, on='linked_asset_id', how='left')
)



deals_ev = pd.merge(deals_ev,deals_ev_array, how = 'left', on ='linked_asset_id')

deals_ev = deals_ev[['linked_asset_id','ev_eur_last_deal','ev_year_last_deal','ev_ebitda_multiple_last_deal','deals_ev_ebitda_max','equity_eur_last_deal','equity_year_last_deal','deals_ev_eur_array','deals_ev_eur_max','deals_ev_years_array','deals_equity_eur_array','deals_equity_eur_max','ebitda_eur_last_deal','ebitda_year_last_deal','revenue_eur_last_deal','revenue_year_last_deal','deals_ev_eur_max_date','deals_equity_eur_max_date']]


#Where EV not available use equity value
deals_ev['ev_eur_last_deal'] = deals_ev['ev_eur_last_deal'].fillna(deals_ev['equity_eur_last_deal'])
deals_ev['ev_year_last_deal'] = deals_ev['ev_year_last_deal'].fillna(deals_ev['equity_year_last_deal'])

deals_ev['deals_ev_eur_max'] = deals_ev['deals_ev_eur_max'].fillna(deals_ev['deals_equity_eur_max'])
deals_ev['deals_ev_eur_max_date'] = deals_ev['deals_ev_eur_max_date'].fillna(deals_ev['deals_equity_eur_max_date'])
deals_ev['deals_ev_eur_max_date'] = (deals_ev['deals_ev_eur_max_date'].astype(str).str[:4].replace('NaT', '').replace('nan', ''))



investors_mm_europe = pd.merge(investors_mm_europe,deals_ev, how = 'left' ,  left_on='asset_id', right_on='linked_asset_id')



```

### Estimate EV

```python
investors_mm_europe['years_since_last_deal'] = 2024-investors_mm_europe['ev_year_last_deal']

# FTE Multiplier
investors_mm_europe.loc[investors_mm_europe['years_since_last_deal'] < 2, 'fte_multiplier'] = 1
investors_mm_europe.loc[investors_mm_europe['years_since_last_deal'] == 2, 'fte_multiplier'] = (1+ investors_mm_europe['fte_growth_twoyears']/100) ** investors_mm_europe['years_since_last_deal']
investors_mm_europe.loc[(investors_mm_europe['years_since_last_deal'] >= 3) & (investors_mm_europe['years_since_last_deal'] <= 6), 'fte_multiplier'] = (1+ investors_mm_europe['fte_growth_threeyears']/100) ** investors_mm_europe['years_since_last_deal']
investors_mm_europe['fte_multiplier'] = investors_mm_europe['fte_multiplier'].clip(upper=2)


# Revenue Growth Multiplier
investors_mm_europe.loc[investors_mm_europe['years_since_last_deal'] < 2, 'revenue_multiplier'] = 1
investors_mm_europe.loc[investors_mm_europe['years_since_last_deal'] == 2, 'revenue_multiplier'] = (1+ investors_mm_europe['revenue_growth_twoyears']/100) ** investors_mm_europe['years_since_last_deal']
investors_mm_europe.loc[(investors_mm_europe['years_since_last_deal'] >= 3) & (investors_mm_europe['years_since_last_deal'] <= 6), 'revenue_multiplier'] = (1+ investors_mm_europe['revenue_growth_threeyears']/100) ** investors_mm_europe['years_since_last_deal']
investors_mm_europe['revenue_multiplier'] = investors_mm_europe['revenue_multiplier'].clip(upper=2)

# Use revenue multiplier first if not there use fte multiplier
investors_mm_europe['multiplier'] = investors_mm_europe['revenue_multiplier']
investors_mm_europe['multiplier'] = investors_mm_europe['multiplier'].fillna(investors_mm_europe['fte_multiplier'])

```

```python
# Estimate EV managed post 2023 based on deal value
investors_mm_europe.loc[investors_mm_europe['ev_year_last_deal'] >= 2023, 'estd_ev_managed'] = investors_mm_europe['ownership_pct'] * investors_mm_europe['ev_eur_last_deal'] * investors_mm_europe['multiplier']

# Compare to deal value reported whenever 
#investors_mm_europe['verify_historical_estd_ev_managed'] = (investors_mm_europe['ownership_pct'] * investors_mm_europe['ev_eur_last_deal'])
investors_mm_europe['verify_historical_estd_ev_managed_based_on_max_deal_ev'] = (investors_mm_europe['ownership_pct'] * investors_mm_europe['deals_ev_eur_max'])

```

```python
#Estimating rest of EV based on formula (where we don't fill based on last reported EVs)


investors_mm_europe['estd_ev_managed'] = investors_mm_europe['estd_ev_managed'].fillna(
    investors_mm_europe['ebitda_eur_pos_fill_na'] * 
    investors_mm_europe['predicted_exit_multiple_fill_na'] * 
    investors_mm_europe['ownership_pct']
)

# Delta with last reported historical values

investors_mm_europe['ratio_to_deal_max'] = (investors_mm_europe['estd_ev_managed']/investors_mm_europe['verify_historical_estd_ev_managed_based_on_max_deal_ev']) 
```

### Check for overrides

```python
columns_filter = [
'ratio_to_median_ev',
'percentage_of_ev',
'count',
'asset_id',
'asset_name',
'investor_id',
'investor_name',
'estd_ev_managed',
'verify_historical_estd_ev_managed_based_on_max_deal_ev',
'ratio_to_deal_max',
'ownership_pct',
'buyer_share_pcts',
'owner_shares',
'deals_ev_eur_max',
'ev_eur_last_deal',
'deals_ev_eur_max_date',
'multiplier',
'ev_year_last_deal',
'last_deal_year',
'predicted_exit_multiple_fill_na',
'ev_ebitda_multiple_last_deal',
'deals_ev_ebitda_max',
'equity_eur_last_deal',
'equity_year_last_deal',
'ebitda_eur_last_deal',
'ebitda_year_last_deal',
'revenue_eur_last_deal',
'revenue_year_last_deal',
'sector',
'subsector',
'ownership',
'sub_region',
'predicted_exit_multiple',
'revenue_eur',
'ebitda_eur',
'net_debt_eur',
'total_ownership_pct',
'median_ebitda_pos',
'ebitda_eur_pos_fill_na',
'revenue_eur_fill_na',
'fte_multiplier',
'revenue_multiplier',
'investor_country_name',
'investor_sub_region',
'above_10_pct_flag',
'above_25_pct_flag',
'above_50_pct_flag',
'total_estd_ev_managed',
'median_ev'
]
```

#### Ratio to Median EV

```python
#Check for OUTLIERS so assets where the investment EV is 10x the median (only check manually check ownership shares over 1bn EV)

investor_medians = (
    investors_mm_europe.groupby(['investor_id'])['estd_ev_managed']
    .agg(median_ev='median', count='count')
    .reset_index()
)


df_summary = pd.merge(investors_mm_europe, investor_medians, left_on = 'investor_id', right_on = 'investor_id', how='left')
df_summary['ratio_to_median_ev'] = df_summary['estd_ev_managed']/df_summary['median_ev'] 
df_summary['ev_eur_last_deal_share'] = df_summary['ev_eur_last_deal'] * df_summary['median_ev'] 



```

#### Percentage of EV

```python
# Get percentage of EV each asset represents

df_summary['total_estd_ev_managed'] = df_summary.groupby('investor_id')['estd_ev_managed'].transform('sum')
#df_summary['rank'] = df_summary.groupby('investor_id')['estd_ev_managed'].rank(method='first', ascending=False)
df_summary['percentage_of_ev'] = (df_summary['estd_ev_managed'] / df_summary['total_estd_ev_managed']) * 100
df_summary['owner_shares'] = df_summary['owner_shares'].apply(lambda x: 'MINORITY' if x == 'minority' else x)

df_summary['above_10_pct_flag'] = df_summary['percentage_of_ev'] > 10
df_summary['above_25_pct_flag'] = df_summary['percentage_of_ev'] > 25
df_summary['above_50_pct_flag'] = df_summary['percentage_of_ev'] > 50



df_summary['above_10_pct_flag'] = df_summary['above_10_pct_flag'].astype(int)
df_summary['above_25_pct_flag'] = df_summary['above_25_pct_flag'].astype(int)
df_summary['above_50_pct_flag'] = df_summary['above_50_pct_flag'].astype(int)

df_summary = df_summary[columns_filter]

df_summary

```

#### Largest 250 Holdings Check

```python

df_summary = df_summary.sort_values(by='estd_ev_managed', ascending = False).reset_index(drop = True)

replicator(df_summary)

```

#### Case Studies

```python
investors_mm_europe[investors_mm_europe['asset_id']==985249]
```

```python
investors_mm_europe[investors_mm_europe['asset_id']==5532]
```

```python
investors_mm_europe[investors_mm_europe['asset_id']==16630]
```

#### Fill using manual overrides

```python
#Overide estimated multiple and ownership share based on manual checks (this is neccsary for BPI France type owners where they own maybe only 3% in a very large company)
# Need to add multiplier override

#Column overide is 0 where it was manually checked but no overide decsison was made it was 1 where manually checked and override decision was made

investors_mm_europe = pd.merge(investors_mm_europe,investor_ranking_override, on = ['investor_id','asset_id'], how = 'left', suffixes=('', '_override'))

investors_mm_europe.loc[investors_mm_europe['override'] == 1, ['ownership_pct', 'predicted_exit_multiple_fill_na']] = \
    investors_mm_europe.loc[investors_mm_europe['override'] == 1, ['ownership_pct_override', 'predicted_exit_multiple_fill_na_override']].values

# Now, apply overrides for ev_eur_last_deal and ev_year_last_deal ONLY when their override values are not null
mask = (investors_mm_europe['override'] == 1) & (investors_mm_europe['ev_eur_last_deal_override'].notnull())

investors_mm_europe.loc[mask, 'ev_eur_last_deal'] = investors_mm_europe.loc[mask, 'ev_eur_last_deal_override']

mask = (investors_mm_europe['override'] == 1) & (investors_mm_europe['ev_year_last_deal_override'].notnull())

investors_mm_europe.loc[mask, 'ev_year_last_deal'] = investors_mm_europe.loc[mask, 'ev_year_last_deal_override']

#Manually correct a few EBITDAs for BPI France and deal value for Ardonagh Group 2333

investors_mm_europe.loc[investors_mm_europe['asset_id']==1081931,'ebitda_eur_pos_fill_na'] = 8531

investors_mm_europe.loc[investors_mm_europe['override'] == 1, 'estd_ev_managed'] = (
    investors_mm_europe['ebitda_eur_pos_fill_na'] * 
    investors_mm_europe['predicted_exit_multiple_fill_na'] * 
    investors_mm_europe['ownership_pct']
)

investors_mm_europe.loc[investors_mm_europe['ev_year_last_deal'] >= 2023, 'estd_ev_managed'] = investors_mm_europe['ownership_pct'] * investors_mm_europe['ev_eur_last_deal'] * investors_mm_europe['multiplier'] 

investors_mm_europe['verify_historical_estd_ev_managed'] = (investors_mm_europe['ownership_pct'] * investors_mm_europe['ev_eur_last_deal'])


investors_mm_europe['delta_with_verify'] = (investors_mm_europe['estd_ev_managed'] - investors_mm_europe['verify_historical_estd_ev_managed']) / investors_mm_europe['estd_ev_managed']

#where 'estd_ev_managed' is less than historical value use the current value

investors_mm_europe.loc[
    investors_mm_europe['estd_ev_managed'] < investors_mm_europe['verify_historical_estd_ev_managed'],
    'estd_ev_managed'
] = investors_mm_europe['verify_historical_estd_ev_managed']



```

```python
#Number of assets where manually overwritten

investors_mm_europe['override'].value_counts()
```

```python
investors_mm_europe = investors_mm_europe.sort_values(by='estd_ev_managed', ascending = False)
```

```python
# Check post manual override which still have more than 10x EV
#Check for OUTLIERS so assets where the investment EV is 10x the median (only check manually check ownership shares over 1bn EV)

investor_medians = investors_mm_europe.groupby(['investor_id'])['estd_ev_managed'].median().reset_index()
investor_medians = investor_medians.rename(columns={"estd_ev_managed":"median_ev"})

df_summary = pd.merge(investors_mm_europe, investor_medians, left_on = 'investor_id', right_on = 'investor_id', how='left')

# Step 3: Filter investors where their median estd_ev is at least 10 times the overall median
df_summary = df_summary[df_summary['estd_ev_managed'] >= 10 * df_summary['median_ev']]

df_summary = df_summary[[
'asset_id',
'asset_name',
'investor_id',
'investor_name',
'last_deal_year',
'ownership_pct', 
'predicted_exit_multiple_fill_na',
'estd_ev_managed',
'median_ev',
'ev_eur_last_deal',
'ev_year_last_deal',
'ev_ebitda_multiple',
'owner_shares',
#'highlighted_buyer_share_pct',                         
'equity_eur_last_deal',
'equity_year_last_deal',
'ebitda_eur_last_deal',
'ebitda_year_last_deal',
'revenue_eur_last_deal',
'revenue_year_last_deal',
'sector',
'subsector',
'ownership',
'predicted_exit_multiple',
'revenue_eur',
'ebitda_eur',
'net_debt_eur',
'total_ownership_pct',
'median_ebitda_pos',
'ebitda_eur_pos_fill_na',
'override'
]]

df_summary

```

```python
df_summary['override'].value_counts()
```

```python
# Check for largest 100 ownership shares

df_summary = investors_mm_europe.sort_values(by='estd_ev_managed', ascending = False).head(100)

df_summary = df_summary[[
'asset_id',
'asset_name',
'investor_id',
'investor_name',
'last_deal_year',
'ownership_pct', 
'predicted_exit_multiple_fill_na',
'estd_ev_managed',
'ev_eur_last_deal',
'ev_year_last_deal',
'ev_ebitda_multiple',
'owner_shares',
#'buyer_share_pcts',                         
'equity_eur_last_deal',
'equity_year_last_deal',
'ebitda_eur_last_deal',
'ebitda_year_last_deal',
'revenue_eur_last_deal',
'revenue_year_last_deal',
'sector',
'subsector',
'ownership',
'predicted_exit_multiple',
'revenue_eur',
'ebitda_eur',
'net_debt_eur',
'total_ownership_pct',
'median_ebitda_pos',
'ebitda_eur_pos_fill_na',
]]

df_summary
```

### Post Overide Lookup

```python
#Check for OUTLIERS so assets where the investment EV is 10x the median (only check manually check ownership shares over 1bn EV)

investor_medians = (
    investors_mm_europe.groupby(['investor_id'])['estd_ev_managed']
    .agg(median_ev='median', count='count')
    .reset_index()
)

df_summary = pd.merge(investors_mm_europe, investor_medians, left_on = 'investor_id', right_on = 'investor_id', how='left')

# Step 3: Filter investors where their median estd_ev is at least 10 times the overall median
df_summary = df_summary.sort_values(by='estd_ev_managed', ascending = False)

df_summary['10x'] = df_summary['estd_ev_managed']/df_summary['median_ev'] 

df_summary = df_summary[columns_filter]

```

### Case Studies

```python
columns = [
'asset_id',
'asset_name',
'investor_id',
'investor_name',
'last_deal_year',
'ownership_pct', 
'predicted_exit_multiple_fill_na',
'estd_ev_managed',
'ev_eur_last_deal',
'ev_year_last_deal',
'ev_ebitda_multiple',
'owner_shares',
'buyer_share_pcts',                         
'equity_eur_last_deal',
'equity_year_last_deal',
'ebitda_eur_last_deal',
'ebitda_year_last_deal',
'revenue_eur_last_deal',
'revenue_year_last_deal',
'sector',
'subsector',
'ownership_old',
'predicted_exit_multiple',
'revenue_eur',
'ebitda_eur',
'net_debt_eur',
'total_ownership_pct',
'median_ebitda_pos',
'ebitda_eur_pos_fill_na',
]
```

```python
investors_mm_europe[investors_mm_europe['override'].notna()]
```

```python
#Case Study
investors_mm_europe[investors_mm_europe['investor_id']==1].sort_values(by='estd_ev_managed',ascending = False)
```

### Europe 250

```python
investor_ranking = investors_mm_europe.groupby(
    ['investor_id']).agg(
    name=('investor_name', 'first'),
    count=('investor_id', 'count'),
    investor_hq_city=('investor_hq_city', 'first'),
    investor_country_name=('investor_country_name', 'first'),
    investor_region=('investor_region', 'first'),
    investor_sub_region=('investor_sub_region', 'first'),
    funds_raised_last_five_years_eur=('funds_raised_last_five_years_eur', 'first'),
    mean_ebitda_pos = ('ebitda_eur_pos','mean'),
    median_ebitda_pos = ('ebitda_eur_pos','median'),
    count_ebitda_pos = ('ebitda_eur_pos','count'),
    estd_ev_managed = ('estd_ev_managed','sum')
)
```

```python
df_summary = investors_mm_europe.copy()

df_summary['total_estd_ev_managed'] = df_summary.groupby('investor_id')['estd_ev_managed'].transform('sum')
df_summary['rank'] = df_summary.groupby('investor_id')['estd_ev_managed'].rank(method='first', ascending=False)
df_summary['asset_percentage'] = (df_summary['estd_ev_managed'] / df_summary['total_estd_ev_managed']) * 100
df_summary = df_summary.sort_values(['investor_id', 'rank'])
df_summary = df_summary[df_summary['rank'] <= 10].copy()

df_summary['owner_shares'] = df_summary['owner_shares'].apply(lambda x: 'MINORITY' if x == 'minority' else x)

df_summary['above_25_pct_flag'] = df_summary['asset_percentage'] > 25
df_summary['above_50_pct_flag'] = df_summary['asset_percentage'] > 50

df_summary['above_25_pct_flag'] = df_summary['above_25_pct_flag'].astype(int)
df_summary['above_50_pct_flag'] = df_summary['above_50_pct_flag'].astype(int)

df_summary['top_5_info'] = df_summary.apply(
    lambda row: f"{row['asset_name']} ({row['asset_percentage']:.1f}% | {row['owner_shares']} | {row['estd_ev_managed']:,.0f})", axis=1
)


# df_summary['is_infrastructure'] = (df_summary['subsector'] == 'infrastructure').astype(int)

# Group by investor_id and aggregate both top_5_info and the flags


df_summary = df_summary.groupby('investor_id').agg({
    'top_5_info': lambda x: ', '.join(x),
    'above_25_pct_flag': 'max',  # Keep the maximum value of flag_25
    'above_50_pct_flag': 'max',
    'owner_shares': 'first'
}).reset_index()

df_summary['largest_holding_is_minority'] = (df_summary['owner_shares'] == 'MINORITY').astype(int)
df_summary = df_summary.drop(columns=['owner_shares'])


df_summary
```

```python
df_summary[df_summary['investor_id']==160]
```

```python

investor_ranking = pd.merge(investor_ranking,df_summary,on = ['investor_id'], how = 'left')
```

```python
df_summary = investors_mm_europe.copy()

def weighted_avg(group):
    return (group['ebitda_eur_pos_fill_na'] * group['ownership_pct']).sum() / group['ownership_pct'].sum()

# Apply the function to each group
investor_level_avg = df_summary.groupby('investor_id').apply(weighted_avg).reset_index(name='weighted_avg_ebitda')

investor_level_avg
```

```python
investor_ranking_summary = investor_ranking.sort_values(by = 'estd_ev_managed',ascending = False)
```

```python
investor_ranking_summary = pd.merge(investor_ranking_summary, entries_exits_count_EU, how='left', on = 'investor_id')
```

```python
#investor_ranking_summary['is_infrastructure'] = investor_ranking_summary['is_infrastructure']/investor_ranking_summary['count']
```

```python
europe_all = investor_ranking_summary[
                (investor_ranking_summary['count']>=5) & 
                (investor_ranking_summary['count_ebitda_pos']>=3) &
                (investor_ranking_summary['entries_count']>=5)]

europe_all = europe_all.copy()
europe_all[['entries_count','exits_count']] = europe_all[['entries_count', 'exits_count']].fillna(0)
```

```python
europe_all['funds_raised_last_five_years_eur'] = europe_all['funds_raised_last_five_years_eur'].replace(0, "-")

```

```python
europe_all = europe_all.copy()
europe_all['rank'] = europe_all['estd_ev_managed'].rank(method='first', ascending=False)
```

```python
europe_all = europe_all.reset_index(drop=True)
```

```python
europe_500 = europe_all.head(500)
europe_250 = europe_all.head(250)
```

```python
europe_500[['investor_id', 'name']].to_clipboard(index=False)
```

```python
replicator(europe_250)
```

# REGIONAL RANKING

```python
investor_ranking_region = investors_mm_europe.groupby(
    ['sub_region','investor_id'], as_index=False).agg(
     name=('investor_name', 'first'),
    count=('investor_id', 'count'),
    investor_hq_city=('investor_hq_city', 'first'),
    investor_country_name=('investor_country_name', 'first'),
    investor_region=('investor_region', 'first'),
    investor_sub_region=('investor_sub_region', 'first'),
    funds_raised_last_five_years_eur=('funds_raised_last_five_years_eur', 'first'),
    mean_ebitda_pos = ('ebitda_eur_pos','mean'),
    median_ebitda_pos = ('ebitda_eur_pos','median'),
    count_ebitda_pos = ('ebitda_eur_pos','count'),
    estd_ev_managed = ('estd_ev_managed','sum')
)

```

```python

df_summary = investors_mm_europe.copy()
df_summary['total_estd_ev_managed'] = df_summary.groupby(['investor_id', 'sub_region'])['estd_ev_managed'].transform('sum')
df_summary['rank'] = df_summary.groupby(['investor_id', 'sub_region'])['estd_ev_managed'].rank(method='first', ascending=False)
df_summary['asset_percentage'] = (df_summary['estd_ev_managed'] / df_summary['total_estd_ev_managed']) * 100
df_summary = df_summary.sort_values(['investor_id', 'sub_region', 'rank'])
df_summary = df_summary[df_summary['rank'] <= 10].copy()

df_summary['owner_shares'] = df_summary['owner_shares'].apply(lambda x: 'MINORITY' if x == 'minority' else x)

df_summary['top_5_info'] = df_summary.apply(
    lambda row: f"{row['asset_name']} ({row['asset_percentage']:.1f}% | {row['owner_shares']} | {row['estd_ev_managed']:,.0f})", axis=1
)
df_summary = df_summary.groupby(['investor_id', 'sub_region'])['top_5_info'] \
                      .apply(lambda x: ', '.join(x)) \
                      .reset_index()

df_summary

```

```python
df_summary[df_summary['investor_id']==223]
```

```python
investor_ranking_region = pd.merge(investor_ranking_region,df_summary,on = ['investor_id','sub_region'], how = 'left')
```

```python
investor_ranking_summary_region = pd.merge(investor_ranking_region, entries_exits_count_sub_region, on=['sub_region', 'investor_id'],how='left', suffixes=('', '_y'))
investor_ranking_summary_region.drop(investor_ranking_summary_region.filter(regex='_y$').columns, axis=1, inplace=True)
```

```python
investor_ranking_summary_region = investor_ranking_summary_region.sort_values(by = ['sub_region','estd_ev_managed'],ascending = False)
```

### Top 50

```python
#Extra Entries condition for individual rankings
region = investor_ranking_summary_region[
                (investor_ranking_summary_region['count']>=3) & 
                (investor_ranking_summary_region['count_ebitda_pos']>=2) &
                (investor_ranking_summary_region['entries_count']>=2)
]
```

```python
region_50 =  region.groupby('sub_region',as_index= False).apply(lambda x: x.head(50)).sort_values(by ='estd_ev_managed', ascending = False).reset_index(drop=True)

region_50['rank'] = region_50.groupby('sub_region')['estd_ev_managed'].rank(method='dense', ascending=False)

# Reorder the columns
columns = list(region_50.columns)
columns.insert(0, columns.pop(columns.index('rank')))
region_50 = region_50[columns]

region_50['funds_raised_last_five_years_eur'] = region_50['funds_raised_last_five_years_eur'].replace(0, "-")

```

```python
investors_mm_europe[investors_mm_europe['asset_id']==1361277][['ownership_pct','estd_ev_managed','ebitda_eur']]
```

```python
region_50_investors_explode =  investors_mm_europe[(investors_mm_europe['investor_id'].isin(region_50.index))]
```

### Top 100

```python
region_100 =  region.groupby('sub_region',as_index= False).apply(lambda x: x.head(100)).sort_values(by ='estd_ev_managed', ascending = False).reset_index(drop=True)

region_100['rank'] = region_100.groupby('sub_region')['estd_ev_managed'].rank(method='dense', ascending=False)

# Reorder the columns
columns = list(region_100.columns)
columns.insert(0, columns.pop(columns.index('rank')))
region_100 = region_100[columns]

region_100['funds_raised_last_five_years_eur'] = region_100['funds_raised_last_five_years_eur'].replace(0, "-")

```

```python
region_100_investors_explode =  investors_mm_europe[(investors_mm_europe['investor_id'].isin(region_100.index))]
```

# COUNTRY RANKING

```python
investor_ranking_country = investors_mm_europe.groupby(
    ['country_name','investor_id'], as_index=False).agg(
     name=('investor_name', 'first'),
    count=('investor_id', 'count'),
    investor_hq_city=('investor_hq_city', 'first'),
    investor_country_name=('investor_country_name', 'first'),
    investor_region=('investor_region', 'first'),
    investor_sub_region=('investor_sub_region', 'first'),
    funds_raised_last_five_years_eur=('funds_raised_last_five_years_eur', 'first'),
    mean_ebitda_pos = ('ebitda_eur_pos','mean'),
    median_ebitda_pos = ('ebitda_eur_pos','median'),
    count_ebitda_pos = ('ebitda_eur_pos','count'),
    estd_ev_managed = ('estd_ev_managed','sum')
)

```

```python

df_summary = investors_mm_europe.copy()
df_summary['total_estd_ev_managed'] = df_summary.groupby(['investor_id', 'country_name'])['estd_ev_managed'].transform('sum')
df_summary['rank'] = df_summary.groupby(['investor_id', 'country_name'])['estd_ev_managed'].rank(method='first', ascending=False)
df_summary['asset_percentage'] = (df_summary['estd_ev_managed'] / df_summary['total_estd_ev_managed']) * 100
df_summary = df_summary.sort_values(['investor_id', 'country_name', 'rank'])
df_summary = df_summary[df_summary['rank'] <= 10].copy()

df_summary['owner_shares'] = df_summary['owner_shares'].apply(lambda x: 'MINORITY' if x == 'minority' else x)

df_summary['top_5_info'] = df_summary.apply(
    lambda row: f"{row['asset_name']} ({row['asset_percentage']:.1f}% | {row['owner_shares']} | {row['estd_ev_managed']:,.0f})", axis=1
)
df_summary = df_summary.groupby(['investor_id', 'country_name'])['top_5_info'] \
                      .apply(lambda x: ', '.join(x)) \
                      .reset_index()

df_summary

```

```python
investor_ranking_country = pd.merge(investor_ranking_country,df_summary,on = ['investor_id','country_name'], how = 'left')
```

```python
investor_ranking_summary_country = pd.merge(investor_ranking_country, entries_exits_count_country, on=['country_name', 'investor_id'],how='left', suffixes=('', '_y'))
investor_ranking_summary_country.drop(investor_ranking_summary_country.filter(regex='_y$').columns, axis=1, inplace=True)
```

```python
investor_ranking_summary_country = investor_ranking_summary_country.sort_values(by = ['country_name','estd_ev_managed'],ascending = False)
```

## Top 50

```python
#Extra Entries condition for individual rankings
country = investor_ranking_summary_country[
                (investor_ranking_summary_country['count']>=3) & 
                (investor_ranking_summary_country['count_ebitda_pos']>=2) &
                (investor_ranking_summary_country['entries_count']>=2)
]
```

```python
country_50 =  country.groupby('country_name',as_index= False).apply(lambda x: x.head(50)).sort_values(by ='estd_ev_managed', ascending = False).reset_index(drop=True)

country_50['rank'] = country_50.groupby('country_name')['estd_ev_managed'].rank(method='dense', ascending=False)

# Reorder the columns
columns = list(country_50.columns)
columns.insert(0, columns.pop(columns.index('rank')))
country_50 = country_50[columns]

country_50['funds_raised_last_five_years_eur'] = country_50['funds_raised_last_five_years_eur'].replace(0, "-")

```

```python
country_50_investors_explode = investors_mm_europe[(investors_mm_europe['investor_id'].isin(country_50.index))]
```

# SECTOR RANKING

```python
investor_ranking_sector = investors_mm_europe.groupby(
    ['sector','investor_id'], as_index=False).agg(
     name=('investor_name', 'first'),
    count=('investor_id', 'count'),
    investor_hq_city=('investor_hq_city', 'first'),
    investor_country_name=('investor_country_name', 'first'),
    investor_region=('investor_region', 'first'),
    investor_sub_region=('investor_sub_region', 'first'),
    funds_raised_last_five_years_eur=('funds_raised_last_five_years_eur', 'first'),
    mean_ebitda_pos = ('ebitda_eur_pos','mean'),
    median_ebitda_pos = ('ebitda_eur_pos','median'),
    count_ebitda_pos = ('ebitda_eur_pos','count'),
    estd_ev_managed = ('estd_ev_managed','sum')
)

```

```python

df_summary = investors_mm_europe.copy()
df_summary['total_estd_ev_managed'] = df_summary.groupby(['investor_id', 'sector'])['estd_ev_managed'].transform('sum')
df_summary['rank'] = df_summary.groupby(['investor_id', 'sector'])['estd_ev_managed'].rank(method='first', ascending=False)
df_summary['asset_percentage'] = (df_summary['estd_ev_managed'] / df_summary['total_estd_ev_managed']) * 100
df_summary = df_summary.sort_values(['investor_id', 'sector', 'rank'])
df_summary = df_summary[df_summary['rank'] <= 10].copy()

df_summary['owner_shares'] = df_summary['owner_shares'].apply(lambda x: 'MINORITY' if x == 'minority' else x)

df_summary['top_5_info'] = df_summary.apply(
    lambda row: f"{row['asset_name']} ({row['asset_percentage']:.1f}% | {row['owner_shares']} | {row['estd_ev_managed']:,.0f})", axis=1
)
df_summary = df_summary.groupby(['investor_id', 'sector'])['top_5_info'] \
                      .apply(lambda x: ', '.join(x)) \
                      .reset_index()

df_summary

```

```python
investor_ranking_sector = pd.merge(investor_ranking_sector,df_summary,on = ['investor_id','sector'], how = 'left')
```

```python
investor_ranking_summary_sector = pd.merge(investor_ranking_sector, entries_exits_count_sector, on=['sector', 'investor_id'],how='left', suffixes=('', '_y'))
investor_ranking_summary_sector.drop(investor_ranking_summary_sector.filter(regex='_y$').columns, axis=1, inplace=True)
```

```python
investor_ranking_summary_sector = investor_ranking_summary_sector.sort_values(by = ['sector','estd_ev_managed'],ascending = False)
```

### Top 50

```python
#Extra Entries condition for individual rankings
sector = investor_ranking_summary_sector[
                (investor_ranking_summary_sector['count']>=3) & 
                (investor_ranking_summary_sector['count_ebitda_pos']>=2) &
                (investor_ranking_summary_sector['entries_count']>=2)
]
```

```python
sector_50 =  sector.groupby('sector',as_index= False).apply(lambda x: x.head(50)).sort_values(by ='estd_ev_managed', ascending = False).reset_index(drop=True)

sector_50['rank'] = sector_50.groupby('sector')['estd_ev_managed'].rank(method='dense', ascending=False)

# Reorder the columns
columns = list(sector_50.columns)
columns.insert(0, columns.pop(columns.index('rank')))
sector_50 = sector_50[columns]

sector_50['funds_raised_last_five_years_eur'] = sector_50['funds_raised_last_five_years_eur'].replace(0, "-")

```

```python
sector_50_investors_explode =  investors_mm_europe[(investors_mm_europe['investor_id'].isin(sector_50.index))]
```

### Top 100

```python
sector_100 =  sector.groupby('sector',as_index= False).apply(lambda x: x.head(100)).sort_values(by ='estd_ev_managed', ascending = False).reset_index(drop=True)

sector_100['rank'] = sector_100.groupby('sector')['estd_ev_managed'].rank(method='dense', ascending=False)

# Reorder the columns
columns = list(sector_100.columns)
columns.insert(0, columns.pop(columns.index('rank')))
sector_100 = sector_100[columns]

sector_100['funds_raised_last_five_years_eur'] = sector_100['funds_raised_last_five_years_eur'].replace(0, "-")



```

```python
sector_100_investors_explode =  investors_mm_europe[(investors_mm_europe['investor_id'].isin(sector_100.index))]
```
