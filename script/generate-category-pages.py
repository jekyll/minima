import os
from slugify import slugify

output_path = "categories"
template_filename = "_templates/category.md"

def collect(input_path):
    ret = set()
    for filename in os.listdir(input_path):
        if filename.endswith(".md") or filename.endswith(".markdown"):
            f = open(input_path + '/' + filename, "r", encoding='UTF-8')
            enter_front = False
            line = f.readline()
            while line:
                strip_line = line.strip()
                if strip_line == '---':
                    if enter_front:
                        break
                    else:
                        enter_front = True
                if enter_front and strip_line.startswith('categories:'):
                    categories = strip_line[len('categories:'):].strip().lstrip('[').rstrip(']').strip().split(',')
                    for category in categories:
                        ret.add(category.strip())
                    break
                line = f.readline()
            f.close()
    return ret

categories = collect('_posts')
if os.path.isdir('_drafts'):
    categories = categories.union(collect('_drafts'))
print('Collected categories: ' + str(categories))

if os.path.isdir(output_path):
    for filename in os.listdir(output_path):
        file_path = os.path.join(output_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))
else:
    os.mkdir(output_path)

template = open(template_filename, 'r', encoding='UTF-8')
template_data = template.read()
for category in categories:
    f = open(output_path + '/' + slugify(category) + '.md', 'w', encoding='UTF-8')
    data = template_data.replace('__category__', category)
    f.write(data)
    f.close()
template.close()